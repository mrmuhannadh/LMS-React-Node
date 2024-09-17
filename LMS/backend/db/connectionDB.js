const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Error with connecting to Database");
  }
};

module.exports = connectDB;
