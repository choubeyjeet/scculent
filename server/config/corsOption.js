const whiteList = ["http://localhost:9000", "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      return callback(null, true);
    } else {
      console.log("Not Allowed by cors.");
      return callback(new Error("Not Allowed By cors."));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
module.exports = corsOptions;
