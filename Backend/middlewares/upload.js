// middlewares/upload.js
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.js"; 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, 
  params: async (req, file) => {
    let folderName;
    let publicIdPrefix;

    const studentId = req.params.id || "unknown";

    if (file.fieldname === "profileImage") {
      folderName = "super60_profiles";
      publicIdPrefix = `profile_${studentId}_${Date.now()}`;
    } else if (file.fieldname.startsWith("projectImage_")) {
      folderName = "super60_project_images"; 
      const projectIndex = file.fieldname.split("_")[1]; 
      publicIdPrefix = `project_${studentId}_${projectIndex}_${Date.now()}`;
    } else {
      folderName = "super60_misc";
      publicIdPrefix = `misc_${Date.now()}`;
    }

    return {
      folder: folderName,
      public_id: publicIdPrefix,
      format: "jpeg", 
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    };
  },
});

const upload = multer({ storage: storage }).any();

export default upload;