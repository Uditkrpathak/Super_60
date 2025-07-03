import express from "express";
import {
  updateStudent,
  deleteStudent,
  getAllStudents,
  getAStudents
} from "../controllers/studentController.js"; 
import  verifyToken  from "../middlewares/verifyToken.js";
import  verifyAdmin  from "../middlewares/verifyAdmin.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

//get all student
router.get('/all',getAllStudents);

//get a student
router.get('/me',verifyToken,getAStudents);

// PUT update a student
router.put("/:id", verifyToken, upload, updateStudent);

// DELETE /api/student/:id (admin only)
router.delete("/:id", verifyToken, verifyAdmin, deleteStudent);

export default router;
