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


export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const files = req.files;

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
            socialLinks,
            skills,
            achievements,
            projects, 
            certificates,
        } = req.body;

        try {
            socialLinks = socialLinks ? JSON.parse(socialLinks) : {};
            skills = skills ? JSON.parse(skills) : [];
            achievements = achievements ? JSON.parse(achievements) : [];
            projects = projects ? JSON.parse(projects) : [];
            certificates = certificates ? JSON.parse(certificates) : [];
        } catch (parseError) {
            console.error("JSON parsing error:", parseError);
            return res.status(400).json({ message: "Invalid JSON data provided." });
        }

        // Initialize a data object for updating the student
        const updateFields = {
            name,
            email,
            branch,
            batch,
            about,
            socialLinks,
            skills: skills.filter(s => s.trim() !== ""), // Filter empty strings
            achievements,
            certificates,
        };

        const profileImageFile = files.find(file => file.fieldname === 'profileImage');

        if (profileImageFile) {
            const newProfileImageCloudinaryUrl = profileImageFile.path; 
            updateFields.profileImage = newProfileImageCloudinaryUrl;

            if (studentProfile.profileImage && studentProfile.profileImage.includes("res.cloudinary.com")) {
                const oldPublicId = studentProfile.profileImage.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`super60_profiles/${oldPublicId}`);
            }
        }

        if (projects && projects.length > 0) {
            const updatedProjects = projects.map((project, i) => {
                const newProject = { ...project }; 

                const projectImageFile = files.find(file => file.fieldname === `projectImage_${i}`);

                if (projectImageFile) {
                    const newProjectImageCloudinaryUrl = projectImageFile.path; 
                    newProject.projectImage = newProjectImageCloudinaryUrl; 

                    if (studentProfile.projects[i] && studentProfile.projects[i].projectImage && studentProfile.projects[i].projectImage.includes("res.cloudinary.com")) {
                        const oldPublicId = studentProfile.projects[i].projectImage.split('/').pop().split('.')[0];
                        cloudinary.uploader.destroy(`super60_project_images/${oldPublicId}`);
                    }
                }

                newProject.technologiesUsed = newProject.technologiesUsed.filter(tech => tech.trim() !== "");
                return newProject;
            });
            updateFields.projects = updatedProjects; 
        } else {
            // If projects array is empty, ensure it's set to an empty array
            updateFields.projects = [];
        }

        // 5. Find and Update the Student Document
        const updatedStudent = await Student.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
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
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message, errors: error.errors });
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
