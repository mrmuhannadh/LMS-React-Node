const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter a first name"],
  },
  lastName: {
    type: String,
  },
  grade: {
    type: Number,
  },
});

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;
