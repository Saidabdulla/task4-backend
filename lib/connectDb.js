const mongoose = require("mongoose");

const connectDB = async () => {
  const URI = process.env.URI;

  mongoose
    .connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Connected to db successfully!"))
    .catch((e) => console.log(e));
};

module.exports = connectDB;
