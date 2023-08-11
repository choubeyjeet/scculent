require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const helmet = require("helmet");
const database = require("./config/database");
const app = express();
const port = process.env.PORT || 6060;

database();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(helmet());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.removeHeader("X-powered-by", false);
  // res.setHeader("Access-Control-Allow-Origin", "https://blog-1999.netlify.app");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/v1/product", require("./routes/product.routes"));
app.use("/api/v1", require("./routes/user.routes"));

app.use("/*", (req, res, next) => {
  return res.status(404).json({ error: "Not Found" });
});
app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
