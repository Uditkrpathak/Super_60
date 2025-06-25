import express from "express";
import {
  updateStudent,
  deleteStudent,
  registerStudent,
  getAllStudents
} from "../controllers/studentController.js"; 
import  verifyToken  from "../middlewares/verifyToken.js";
import  verifyAdmin  from "../middlewares/verifyAdmin.js";

const router = express.Router();

//get all student
router.get('/',getAllStudents);

//register student
router.post("/registerStudent", verifyToken, verifyAdmin, registerStudent);

// PUT /api/student/:id (admin only)
router.put("/:id", verifyToken, verifyAdmin, updateStudent);

// DELETE /api/student/:id (admin only)
router.delete("/:id", verifyToken, verifyAdmin, deleteStudent);

export default router;
