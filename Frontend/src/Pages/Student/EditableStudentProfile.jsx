import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentEditContext from "../../context/StudentEditContext";
import BACKEND_URL from "../../utils/axiosConfig";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const EditableStudentProfile = () => {
    const { studentProfile, setStudentProfile } = useContext(StudentEditContext);
    const { isAdmin } = useContext(AuthContext);

    const navigate = useNavigate();

    // Initial state for new array items (empty templates)
    const initialAchievement = { title: "", description: "", date: "" };
    const initialProject = {
        title: "",
        description: "",
        projectLink: "",
        technologiesUsed: [], // This will be an array of strings, managed dynamically
        projectImage: "", // This will be a URL string
        category: "",
        completionDate: "", // This will be a date string for input type="date"
        githubRepo: "",
    };
    const initialCertificate = { name: "", issuedBy: "", issueDate: "", viewLink: "" };


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        branch: "",
        batch: "",
        about: "",
        socialLinks: {
            github: "",
            linkedIn: "",
            twitter: ""
        },
        skills: [],
        profileImage: null,
        achievements: [],
        projects: [],
        certificates: [],
    });

    const [previewImage, setPreviewImage] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!studentProfile) {
            navigate('/batches');
            return;
        }

        // Initialize formData with existing studentProfile data
        setFormData({
            name: studentProfile.name || "",
            email: studentProfile.email || "",
            branch: studentProfile.branch || "",
            batch: studentProfile.batch || "",
            about: studentProfile.about || "",
            socialLinks: {
                github: studentProfile.socialLinks?.github || "",
                linkedIn: studentProfile.socialLinks?.linkedIn || "",
                twitter: studentProfile.socialLinks?.twitter || ""
            },
            skills: studentProfile.skills?.length > 0 ? studentProfile.skills : [""],
            achievements: studentProfile.achievements?.length > 0 ? studentProfile.achievements : [initialAchievement],
            // For projects, ensure technologiesUsed is an array,
            // and initialize with an empty string if it's empty to show one input field
            projects: studentProfile.projects?.length > 0
                ? studentProfile.projects.map(project => ({
                    ...project,
                    technologiesUsed: project.technologiesUsed?.length > 0 ? project.technologiesUsed : [""]
                }))
                : [{ ...initialProject, technologiesUsed: [""] }], // Initialize new project with one empty tech field
            certificates: studentProfile.certificates?.length > 0 ? studentProfile.certificates : [initialCertificate],
        });

        setPreviewImage(studentProfile.profileImage || "");
    }, [studentProfile, navigate]);

    // Handler for regular input fields (name, email, branch, batch, about)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handler for social links
    const handleSocialLinkChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value
            }
        }));
    };

    // Handler for profile image file input
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, profileImage: file }));
            setPreviewImage(URL.createObjectURL(file)); // For instant preview
        }
    };

    // Handler for individual skill changes
    const handleSkillChange = (index, value) => {
        setFormData((prev) => {
            const updatedSkills = [...prev.skills];
            updatedSkills[index] = value;
            return { ...prev, skills: updatedSkills };
        });
    };

    // Handler to add a new skill
    const handleAddSkill = () => {
        setFormData((prev) => ({
            ...prev,
            skills: [...prev.skills, ""], // Add an empty string for a new skill
        }));
    };

    // Handler to remove a skill
    const handleRemoveSkill = (index) => {
        setFormData((prev) => {
            const updatedSkills = prev.skills.filter((_, i) => i !== index);
            // Ensure there's always at least one empty skill field
            return { ...prev, skills: updatedSkills.length > 0 ? updatedSkills : [""] };
        });
    };


    // Generic handler for changes in array sub-documents (achievements, projects, certificates)
    const handleArrayItemChange = (arrayName, itemIndex, field, value) => {
        setFormData((prev) => {
            const updatedArray = [...prev[arrayName]];
            if (arrayName === "projects" && field === "completionDate") {
                updatedArray[itemIndex][field] = value;
            } else {
                updatedArray[itemIndex][field] = value;
            }
            return { ...prev, [arrayName]: updatedArray };
        });
    };

    // New: Handlers for technologiesUsed array within projects
    const handleTechnologyChange = (projectIndex, techIndex, value) => {
        setFormData((prev) => {
            const updatedProjects = [...prev.projects];
            updatedProjects[projectIndex].technologiesUsed[techIndex] = value;
            return { ...prev, projects: updatedProjects };
        });
    };

    const handleAddTechnology = (projectIndex) => {
        setFormData((prev) => {
            const updatedProjects = [...prev.projects];
            updatedProjects[projectIndex].technologiesUsed.push("");
            return { ...prev, projects: updatedProjects };
        });
    };

    const handleRemoveTechnology = (projectIndex, techIndex) => {
        setFormData((prev) => {
            const updatedProjects = [...prev.projects];
            const updatedTechnologies = updatedProjects[projectIndex].technologiesUsed.filter((_, i) => i !== techIndex);
            updatedProjects[projectIndex].technologiesUsed = updatedTechnologies.length > 0 ? updatedTechnologies : [""]; // Keep at least one empty
            return { ...prev, projects: updatedProjects };
        });
    };


    // Handler for project image file input (specific to projects array)
    const handleProjectImageChange = (index, file) => {
        setFormData((prev) => {
            const updatedProjects = [...prev.projects];
            updatedProjects[index].projectImageFile = file; // Store the file temporarily
            // Optional: You might want a local preview for project image as well
            return { ...prev, projects: updatedProjects };
        });
    };


    // Handler to add a new item to an array sub-document (for achievements, projects, certificates)
    const handleAddArrayItem = (arrayName) => {
        setFormData((prev) => {
            let newItem;
            if (arrayName === "achievements") {
                newItem = { ...initialAchievement };
            } else if (arrayName === "projects") {
                newItem = { ...initialProject, technologiesUsed: [""] }; // New project starts with one empty tech field
            } else if (arrayName === "certificates") {
                newItem = { ...initialCertificate };
            }
            return { ...prev, [arrayName]: [...prev[arrayName], newItem] };
        });
    };

    // Handler to remove an item from an array sub-document (for achievements, projects, certificates)
    const handleRemoveArrayItem = (arrayName, index) => {
        setFormData((prev) => {
            const updatedArray = prev[arrayName].filter((_, i) => i !== index);
            // Ensure there's always at least one empty item if the array becomes empty after removal
            if (updatedArray.length === 0) {
                if (arrayName === "achievements") updatedArray.push({ ...initialAchievement });
                if (arrayName === "projects") updatedArray.push({ ...initialProject, technologiesUsed: [""] }); // Re-add with an empty tech field
                if (arrayName === "certificates") updatedArray.push({ ...initialCertificate });
            }
            return { ...prev, [arrayName]: updatedArray };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();

            // Append all string/number fields directly
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("branch", formData.branch);
            data.append("batch", formData.batch);
            data.append("about", formData.about);

            // Append socialLinks as a JSON string
            data.append("socialLinks", JSON.stringify(formData.socialLinks));

            // Append skills as a JSON string (filter out empty strings)
            data.append("skills", JSON.stringify(formData.skills.filter(skill => skill.trim() !== "")));

            // Append profile image if a new one is selected
            if (formData.profileImage) {
                data.append("profileImage", formData.profileImage);
            }

            // Prepare achievements and certificates for submission
            // Filter out empty technology strings from projects before stringifying
            const projectsToSubmit = formData.projects.map(project => {
                const { projectImageFile, ...rest } = project; // Exclude projectImageFile
                return {
                    ...rest,
                    technologiesUsed: project.technologiesUsed.filter(tech => tech.trim() !== "")
                };
            });


            // Append array fields as JSON strings
            data.append("achievements", JSON.stringify(formData.achievements));
            data.append("projects", JSON.stringify(projectsToSubmit));
            data.append("certificates", JSON.stringify(formData.certificates));

            // Append individual project images
            formData.projects.forEach((project, index) => {
                if (project.projectImageFile) {
                    data.append(`projectImage_${index}`, project.projectImageFile);
                }
            });

            const res = await axios.put(
                `${BACKEND_URL}/student/${studentProfile._id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log("Update successful:", res.data);
            setStudentProfile(res.data.student);
            navigate(isAdmin ? "/batches" : "/student-profile");
        } catch (error) {
            console.error("Update failed:", error?.response?.data?.message || error.message);
            // Optionally, display an error message to the user
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete(
                `${BACKEND_URL}/student/${studentProfile.user}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Delete successful:", res.data);
            navigate("/batches");
        } catch (error) {
            console.error("Delete failed:", error?.response?.data?.message || error.message);
            // Optionally, display an error message to the user
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Student Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="border-b pb-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Basic Information</h3>
                    {["name", "email", "branch", "batch", "about"].map((field) => (
                        <div key={field} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                                {field === 'email' ? 'Email (Cannot be changed)' : field.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <input
                                type="text"
                                name={field}
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={formData[field]}
                                onChange={handleChange}
                                readOnly={field === 'email'}
                            />
                        </div>
                    ))}
                </div>

                {/* Social Links */}
                <div className="border-b pb-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Social Links</h3>
                    {Object.keys(formData.socialLinks).map((field) => (
                        <div key={field} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                                {field} link</label>
                            <input
                                type="url"
                                name={field}
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={formData.socialLinks[field]}
                                onChange={handleSocialLinkChange}
                                placeholder={`Enter your ${field} URL`}
                            />
                        </div>
                    ))}
                </div>

                {/* Skills - Now with Add/Remove buttons */}
                <div className="border-b pb-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-semibold text-gray-700">Skills</h3>
                        <button
                            type="button"
                            onClick={handleAddSkill}
                            className="bg-green-500 text-white px-3 py-1 rounded-full text-lg font-bold hover:bg-green-600 transition-colors"
                            title="Add new skill"
                        >
                            +
                        </button>
                    </div>
                    {formData.skills.map((skill, index) => (
                        <div key={`skill-${index}`} className="flex items-center mb-2 gap-2">
                            <input
                                type="text"
                                className="flex-grow border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                placeholder="Enter a skill (e.g., JavaScript)"
                            />
                            {formData.skills.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSkill(index)}
                                    className="text-red-500 hover:text-red-700 font-bold p-2"
                                    title="Remove skill"
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Profile Image */}
                <div className="border-b pb-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Profile Image</h3>
                    <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        className="w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-full file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-blue-700
                                   hover:file:bg-blue-100"
                    />
                    {previewImage && (
                        <img src={previewImage} alt="Profile Preview" className="mt-4 w-32 h-32 object-cover rounded-full shadow-md" />
                    )}
                </div>

                {/* Dynamic Array Fields: Achievements, Projects, Certificates */}
                {["achievements", "projects", "certificates"].map((arrayName) => (
                    <div key={arrayName} className="border-b pb-4">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xl font-semibold text-gray-700 capitalize">{arrayName}</h3>
                            <button
                                type="button"
                                onClick={() => handleAddArrayItem(arrayName)}
                                className="bg-green-500 text-white px-3 py-1 rounded-full text-lg font-bold hover:bg-green-600 transition-colors"
                                title={`Add new ${arrayName.slice(0, -1)}`}
                            >
                                +
                            </button>
                        </div>

                        {formData[arrayName].map((item, index) => (
                            <div key={`${arrayName}-${index}`} className="bg-gray-50 p-4 rounded-md shadow-sm mb-4 border border-gray-200">
                                <div className="flex justify-end">
                                    {formData[arrayName].length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveArrayItem(arrayName, index)}
                                            className="text-red-500 hover:text-red-700 font-bold"
                                            title={`Remove this ${arrayName.slice(0, -1)}`}
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                                {Object.keys(arrayName === "achievements" ? initialAchievement : arrayName === "projects" ? initialProject : initialCertificate).map((field) => (
                                    <div key={`${arrayName}-${index}-${field}`} className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                                            {field.replace(/([A-Z])/g, ' $1').trim()}
                                            {
                                                (arrayName === "achievements" && field === "title") ||
                                                    (arrayName === "projects" && (field === "title" || field === "description")) ||
                                                    (arrayName === "certificates" && field === "name")
                                                    ? <span className="text-red-500">*</span> : null
                                            }
                                        </label>
                                        {
                                            (field === "description" || (arrayName === "about" && field === "description")) ? (
                                                <textarea
                                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    rows="3"
                                                    value={item[field] || ""}
                                                    onChange={(e) =>
                                                        handleArrayItemChange(arrayName, index, field, e.target.value)
                                                    }
                                                ></textarea>
                                            ) : field === "completionDate" || field === "date" || field === "issueDate" ? (
                                                <input
                                                    type="date"
                                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    value={
                                                        item[field]
                                                            ? new Date(item[field]).toISOString().split('T')[0]
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayItemChange(arrayName, index, field, e.target.value)
                                                    }
                                                />
                                            ) : field === "projectImage" ? (
                                                <>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleProjectImageChange(index, e.target.files[0])}
                                                        className="w-full text-sm text-gray-500
                                                                   file:mr-4 file:py-2 file:px-4
                                                                   file:rounded-full file:border-0
                                                                   file:text-sm file:font-semibold
                                                                   file:bg-purple-50 file:text-purple-700
                                                                   hover:file:bg-purple-100"
                                                    />
                                                    {(item.projectImage || item.projectImageFile) && (
                                                        <img
                                                            src={item.projectImageFile ? URL.createObjectURL(item.projectImageFile) : item.projectImage}
                                                            alt="Project Preview"
                                                            className="mt-2 w-24 h-24 object-cover rounded-md shadow-sm"
                                                        />
                                                    )}
                                                </>
                                            ) : field === "technologiesUsed" ? ( // Dynamic inputs for technologiesUsed
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm font-medium text-gray-700">Technologies:</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddTechnology(index)} // Pass project index
                                                            className="bg-green-500 text-white px-2 py-0.5 rounded-full text-sm font-bold hover:bg-green-600 transition-colors"
                                                            title="Add technology"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    {item.technologiesUsed.map((tech, techIndex) => (
                                                        <div key={`tech-${index}-${techIndex}`} className="flex items-center gap-2">
                                                            <input
                                                                type="text"
                                                                className="flex-grow border border-gray-300 px-3 py-1 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                                value={tech}
                                                                onChange={(e) => handleTechnologyChange(index, techIndex, e.target.value)}
                                                                placeholder="e.g., React, Node.js"
                                                            />
                                                            {item.technologiesUsed.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveTechnology(index, techIndex)}
                                                                    className="text-red-500 hover:text-red-700 font-bold text-lg"
                                                                    title="Remove technology"
                                                                >
                                                                    &times;
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : ( // Default text/url input
                                                <input
                                                    type={
                                                        (field.includes("Link") || field.includes("Repo")) ? "url" : "text"
                                                    }
                                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    value={item[field] || ""}
                                                    onChange={(e) =>
                                                        handleArrayItemChange(arrayName, index, field, e.target.value)
                                                    }
                                                    placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                                />
                                            )
                                        }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6">
                    <button
                        type="submit"
                        className="bg-[#002277] text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors duration-200 ease-in-out shadow-md"
                    >
                        Save Changes
                    </button>
                    {isAdmin && (
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200 ease-in-out shadow-md"
                        >
                            Delete Profile
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EditableStudentProfile;