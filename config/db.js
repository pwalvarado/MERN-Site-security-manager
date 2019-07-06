const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("MongoDB connected..");
  } catch (err) {
    console.log(err.message);

    // proceess exit with failure
    process.exit(1);
  }
};

module.exports = connectDB;
