const express = require("express");
const mongoose = require("mongoose");
const studentRoute = require("./routes/student.route");
const authRoute = require("./routes/auth.route");
const connectDB = require("./db/connectionDB");
const app = express();
const dotenv = require("dotenv");
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 8000;

//start server
app.listen(PORT, () => {
  connectDB();
  console.log("Running on", PORT);
});

//routes
app.use("/api/student", studentRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Welcome to express");
});
