const Student = require("../models/student.model");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});

    if (!students) {
      res.status(200).json({ message: "No any students" });
    }
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(id, req.body);

    if (!student) {
      res.status(404).json({ message: "Student not found" });
    }

    const updatedStudent = await Student.findById(id);

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudent,
  addStudent,
  editStudent,
  deleteStudent,
};
