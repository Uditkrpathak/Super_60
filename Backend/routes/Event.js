import express from "express";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";
import singleUpload from "../middlewares/singleUpload.js";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/",getEvents);
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  singleUpload.single("image"),
  createEvent
);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  singleUpload.single("image"),
  updateEvent
);
router.delete("/:id", verifyToken, verifyAdmin,deleteEvent);

export default router;
