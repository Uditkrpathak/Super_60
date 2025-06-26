import User from "../models/User.js";
import Student from "../models/Student.js";

// getAStudents
export const getAStudents = async (req, res) => {
  try {
    const user = await Student.findOne({user:req.user.id});
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json(user);
  } catch (error) {
    console.error("Get All Students Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// getAllStudents
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Get All Students Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// PUT - Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error while updating student." });
  }
};


// DELETE - Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // First, delete the student profile
    const deletedStudent = await Student.findOneAndDelete({ user: id });

    // Then, delete the user account
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedStudent || !deletedUser) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting student." });
  }
};
