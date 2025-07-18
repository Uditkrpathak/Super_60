import User from "../models/User.js";
import Student from "../models/Student.js";
import cloudinary from "../config/cloudinary.js"; 

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

// update a student
const isSubDocumentEmpty = (obj, initialTemplate) => {
  if (!obj) return true; // If object is null or undefined, it's empty

  // Check if any of the keys from the initial template have non-empty values in the object
  for (const key in initialTemplate) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const initialValue = initialTemplate[key];

      // For arrays (like technologiesUsed within projects)
      if (Array.isArray(initialValue)) {
        if (
          Array.isArray(value) &&
          value.some((item) => typeof item === "string" && item.trim() !== "")
        ) {
          return false;
        }
      }
      // For strings
      else if (typeof value === "string" && value.trim() !== "") {
        return false;
      }
      // For booleans (if different from initial default)
      else if (typeof value === "boolean" && value !== initialValue) {
        return false;
      }
      // For Date objects (if a valid date and different from initial default)
      else if (
        value instanceof Date &&
        !isNaN(value.getTime()) &&
        value.toISOString() !==
          (initialValue ? new Date(initialValue).toISOString() : "")
      ) {
        return false;
      }
      // For objects (e.g., placement) - simple check if it has any keys or is not the default
      else if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        Object.keys(value).length > 0
      ) {
        // For placement, check if 'placed' is true, or if companyName/placedOn are not empty defaults
        if (key === "placement") {
          if (
            value.placed ||
            (value.companyName && value.companyName.trim() !== "") ||
            (value.placedOn && !isNaN(new Date(value.placedOn).getTime()))
          ) {
            return false;
          }
        } else {
          // For other generic objects, assume if it has keys, it's not empty
          return false;
        }
      }
    }
  }
  return true;
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files; // Files array from multer/multer-cloudinary

    const studentProfile = await Student.findById(id);
    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found." });
    }

    let {
      name,
      email,
      branch,
      batch,
      about,
      portfolioLink,
      academicRollNo,
      universityRollNo,
      joinedOn,
      placement,
      socialLinks,
      specialization,
      skills,
      achievements,
      projects,
      certificates,
      internship,
      client,
    } = req.body;

    try {
      // Parse all potential JSON strings from the FormData
      socialLinks = socialLinks ? JSON.parse(socialLinks) : {};
      skills = skills ? JSON.parse(skills) : [];
      achievements = achievements ? JSON.parse(achievements) : [];
      projects = projects ? JSON.parse(projects) : [];
      certificates = certificates ? JSON.parse(certificates) : [];
      placement = placement
        ? JSON.parse(placement)
        : { placed: false, companyName: "", placedOn: "" };
      specialization = specialization ? JSON.parse(specialization) : [];
      internship = internship ? JSON.parse(internship) : [];
      client = client ? JSON.parse(client) : [];
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return res
        .status(400)
        .json({
          message: "Invalid JSON data provided for one or more fields.",
        });
    }

    // Initialize an object for updating the student document
    const updateFields = {};

    // Assign top-level fields, only if they are provided (and not undefined)
    // Check for 'undefined' to allow explicit clearing of fields (e.g., if frontend sends empty string)
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (branch !== undefined) updateFields.branch = branch;
    if (batch !== undefined) updateFields.batch = batch;
    if (about !== undefined) updateFields.about = about;
    if (portfolioLink !== undefined)
      updateFields.portfolioLink = portfolioLink === "" ? null : portfolioLink; // Store null if empty string
    if (academicRollNo !== undefined)
      updateFields.academicRollNo =
        academicRollNo === "" ? null : academicRollNo;
    if (universityRollNo !== undefined)
      updateFields.universityRollNo =
        universityRollNo === "" ? null : universityRollNo;

    // Handle joinedOn date
    if (joinedOn) {
      updateFields.joinedOn = new Date(joinedOn);
    } else if (joinedOn === "") {
      // Frontend sends empty string if cleared
      updateFields.joinedOn = null; // Store null in DB if cleared
    }

    // Handle placement object
    if (placement !== undefined) {
      const updatedPlacement = { ...placement };
      if (updatedPlacement.placedOn) {
        updatedPlacement.placedOn = new Date(updatedPlacement.placedOn);
      } else if (updatedPlacement.placedOn === "") {
        updatedPlacement.placedOn = null;
      }
      updateFields.placement = updatedPlacement;
    }

    if (socialLinks !== undefined) updateFields.socialLinks = socialLinks;

    // Filter out empty strings from skills and specialization arrays
    if (skills !== undefined)
      updateFields.skills = skills.filter((s) => s.trim() !== "");
    if (specialization !== undefined)
      updateFields.specialization = specialization.filter(
        (s) => s.trim() !== ""
      );

    // Define initial templates for isSubDocumentEmpty helper for robust filtering
    const initialAchievement = { title: "", description: "", date: "" };
    const initialInternship = {
      companyName: "",
      certificate: "",
      startDate: "",
      endDate: "",
    };
    const initialClient = {
      companyName: "",
      description: "",
      role: "",
      amount: "",
    };
    const initialCertificate = {
      name: "",
      issuedBy: "",
      issueDate: "",
      viewLink: "",
    };

    if (achievements !== undefined) {
      updateFields.achievements = achievements.filter(
        (item) => !isSubDocumentEmpty(item, initialAchievement)
      );
    }
    if (internship !== undefined) {
      updateFields.internship = internship
        .map((item) => ({
          ...item,
          startDate: item.startDate ? new Date(item.startDate) : null,
          endDate: item.endDate ? new Date(item.endDate) : null,
        }))
        .filter((item) => !isSubDocumentEmpty(item, initialInternship));
    }
    if (client !== undefined) {
      updateFields.client = client.filter(
        (item) => !isSubDocumentEmpty(item, initialClient)
      );
    }
    if (certificates !== undefined) {
      updateFields.certificates = certificates
        .map((item) => ({
          ...item,
          issueDate: item.issueDate ? new Date(item.issueDate) : null,
        }))
        .filter((item) => !isSubDocumentEmpty(item, initialCertificate));
    }

    // --- Image Handling for profileImage ---
    const profileImageFile = files.find(
      (file) => file.fieldname === "profileImage"
    );

    if (profileImageFile) {
      const newProfileImageCloudinaryUrl = profileImageFile.path;
      updateFields.profileImage = newProfileImageCloudinaryUrl;

      // Delete old profile image from Cloudinary if it exists and is a Cloudinary URL
      if (
        studentProfile.profileImage &&
        studentProfile.profileImage.includes("res.cloudinary.com")
      ) {
        const oldPublicId = studentProfile.profileImage
          .split("/")
          .pop()
          .split(".")[0];
        await cloudinary.uploader.destroy(`super60_profiles/${oldPublicId}`); // Adjust folder name if needed
      }
    } else if (req.body.profileImage === "") {
      // Frontend sends empty string if image is cleared
      updateFields.profileImage = ""; // Clear the profile image URL in the database
      // Delete old profile image from Cloudinary if it exists
      if (
        studentProfile.profileImage &&
        studentProfile.profileImage.includes("res.cloudinary.com")
      ) {
        const oldPublicId = studentProfile.profileImage
          .split("/")
          .pop()
          .split(".")[0];
        await cloudinary.uploader.destroy(`super60_profiles/${oldPublicId}`);
      }
    }

    // --- Image Handling for projects ---
    if (projects !== undefined) {
      // Define initial template for projects for the isSubDocumentEmpty helper
      const initialProject = {
        title: "",
        description: "",
        projectLink: "",
        technologiesUsed: [],
        projectImage: "",
        category: "",
        completionDate: "",
        githubRepo: "",
      };

      const updatedProjects = projects
        .map((project, i) => {
          const newProject = { ...project };

          // Convert completionDate string to Date object
          if (newProject.completionDate) {
            newProject.completionDate = new Date(newProject.completionDate);
          } else {
            newProject.completionDate = null; // Ensure it's null if empty string
          }

          const projectImageFile = files.find(
            (file) => file.fieldname === `projectImage_${i}`
          );

          if (projectImageFile) {
            const newProjectImageCloudinaryUrl = projectImageFile.path;
            newProject.projectImage = newProjectImageCloudinaryUrl;

            // Delete old project image from Cloudinary if it exists
            if (
              studentProfile.projects[i] &&
              studentProfile.projects[i].projectImage &&
              studentProfile.projects[i].projectImage.includes(
                "res.cloudinary.com"
              )
            ) {
              const oldPublicId = studentProfile.projects[i].projectImage
                .split("/")
                .pop()
                .split(".")[0];
              cloudinary.uploader.destroy(
                `super60_project_images/${oldPublicId}`
              ); // Use specific folder
            }
          } else if (req.body[`projectImage_${i}`] === "") {
            // This handles cases where a project image was explicitly cleared on the frontend
            if (
              studentProfile.projects[i]?.projectImage &&
              studentProfile.projects[i].projectImage.includes(
                "res.cloudinary.com"
              )
            ) {
              const oldPublicId = studentProfile.projects[i].projectImage
                .split("/")
                .pop()
                .split(".")[0];
              cloudinary.uploader.destroy(
                `super60_project_images/${oldPublicId}`
              );
            }
            newProject.projectImage = ""; // Set the image field in the database to empty
          }

          // Filter empty strings from technologiesUsed array within projects
          newProject.technologiesUsed = (
            newProject.technologiesUsed || []
          ).filter((tech) => tech.trim() !== "");
          return newProject;
        })
        .filter((item) => !isSubDocumentEmpty(item, initialProject)); // Filter out entirely empty projects

      updateFields.projects = updatedProjects;
    } else {
      // If the projects array is sent as undefined or explicitly empty, set it to an empty array
      updateFields.projects = [];
      // Delete all associated project images from Cloudinary for this student
      if (studentProfile.projects && studentProfile.projects.length > 0) {
        for (const project of studentProfile.projects) {
          if (
            project.projectImage &&
            project.projectImage.includes("res.cloudinary.com")
          ) {
            const oldPublicId = project.projectImage
              .split("/")
              .pop()
              .split(".")[0];
            cloudinary.uploader.destroy(
              `super60_project_images/${oldPublicId}`
            );
          }
        }
      }
    }

    // Find and Update the Student Document
    const updatedStudent = await Student.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validation on the update
    });

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ message: "Student not found after update attempt." });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Update error:", error);
    if (error.name === "ValidationError") {
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: "Validation failed.", errors });
    }
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
