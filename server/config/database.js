const mongoose = require("mongoose");

const database = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("Database HOSTNAME: ", con.connection.name);
    });
};
mongoose.connection.on("connected", () => {
  console.log("Database Connected.");
});
mongoose.connection.on("error", () => {
  console.log("Error in connection");
});
process.on("SIGINT", () => {
  console.log("MongoDB connection: Disconnected.");
});

module.exports = database;
