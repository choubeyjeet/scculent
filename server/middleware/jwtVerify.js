const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({
      error: "No Authorization Header",
    });
  }
  try {
    const token = authorization.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({
        error: "Invalid Token Format",
      });
    }
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Session Expired",
        error: error.message,
      });
    }
    if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
      return res.status(401).json({
        message: "Invalid Token",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
      stack: error.stack,
    });
  }
}

const isAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

  if (decoded.role !== "ADMIN") {
    return res
      .status(403)
      .json({ error: "You are not allowed to access this page." });
  }
  next();
};

module.exports = { isAuthenticated, isAdmin };
