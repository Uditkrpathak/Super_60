import User from "../models/User.js";


export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.status(200).json(students);
  } catch (error) {
    console.error("Get All Students Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Register Student 
export const registerStudent = async (req, res) => {
    try {
      const { username = "New Student", email, password } = req.body;
  
      if (!email || !password)
        return res.status(400).json({ message: "All fields are required." });
  
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(409).json({ message: "User already exists." });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: "student",
      });
  
      await newUser.save();
  
      res.status(201).json({
        message: "Student registered successfully",
        userData: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

// PUT - Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedStudent = await User.findByIdAndUpdate(id, updatedData, {
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

    const deletedStudent = await User.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting student." });
  }
};
