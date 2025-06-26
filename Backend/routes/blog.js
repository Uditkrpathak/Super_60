import express from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";
import singleUpload from "../middlewares/singleUpload.js";

const router = express.Router();

router.get("/", getBlogs);
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  singleUpload.single("image"),
  createBlog
);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  singleUpload.single("image"),
  updateBlog
);
router.delete("/:id",verifyToken, verifyAdmin, deleteBlog);

export default router;