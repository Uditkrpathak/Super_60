import express from "express";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/upload.js";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/",getEvents);
router.post("/", verifyToken, verifyAdmin, upload,createEvent);
router.put("/:id", verifyToken, verifyAdmin, upload,updateEvent);
router.delete("/:id", verifyToken, verifyAdmin,deleteEvent);

export default router;
