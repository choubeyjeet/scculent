const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const TokenModel = require("../models/token.model");
const accessToken = async (user) => {
  return await jwt.sign(
    { _id: user._id, role: user.role },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "15m",
    }
  );
};
const refreshToken = async (user) => {
  let refreshToken = crypto.randomUUID();
  let token = new TokenModel({
    userId: user._id,
    refreshToken: refreshToken,
    expireAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
  });
  await token.save();
  return refreshToken;
};
module.exports = { accessToken, refreshToken };
