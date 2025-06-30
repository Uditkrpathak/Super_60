import express from "express";
import multer from "../middlewares/upload.js";
import {
  createFaculty,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import singleUpload from "../middlewares/singleUpload.js"

const router = express.Router();

router.get("/", getAllFaculty); // public
router.post("/", verifyToken, verifyAdmin, singleUpload.single("image"), createFaculty);
router.put("/:id", verifyToken, verifyAdmin, singleUpload.single("image"), updateFaculty);
router.delete("/:id", verifyToken, verifyAdmin, deleteFaculty);

export default router;
