import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return { 
      folder: "super60_blogs",
      public_id: `blog_${Date.now()}`,
      format: "jpeg",
      transformation: [{ width: 800, crop: "limit" }],
    };
  },
});

const singleUpload = multer({ storage });

export default singleUpload;
