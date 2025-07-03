// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import StudentEditContext from "../../context/StudentEditContext";
// import BACKEND_URL from "../../utils/axiosConfig";
// import axios from "axios";
// import AuthContext from "../../context/AuthContext";

// const EditableStudentProfile = () => {
//     const { studentProfile, setStudentProfile } = useContext(StudentEditContext);
//     const { isAdmin } = useContext(AuthContext);

//     const navigate = useNavigate();

//     // Initial state for new array items (empty templates)
//     const initialAchievement = { title: "", description: "", date: "" };
//     const initialProject = {
//         title: "",
//         description: "",
//         projectLink: "",
//         technologiesUsed: [], // This will be an array of strings, managed dynamically
//         projectImage: "", // This will be a URL string
//         category: "",
//         completionDate: "", // This will be a date string for input type="date"
//         githubRepo: "",
//     };
//     const initialCertificate = { name: "", issuedBy: "", issueDate: "", viewLink: "" };


//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         branch: "",
//         batch: "",
//         about: "",
//         socialLinks: {
//             github: "",
//             linkedIn: "",
//             twitter: ""
//         },
//         skills: [],
//         profileImage: null,
//         achievements: [],
//         projects: [],
//         certificates: [],
//     });

//     const [previewImage, setPreviewImage] = useState("");
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         if (!studentProfile) {
//             navigate('/batches');
//             return;
//         }

//         // Initialize formData with existing studentProfile data
//         setFormData({
//             name: studentProfile.name || "",
//             email: studentProfile.email || "",
//             branch: studentProfile.branch || "",
//             batch: studentProfile.batch || "",
//             about: studentProfile.about || "",
//             socialLinks: {
//                 github: studentProfile.socialLinks?.github || "",
//                 linkedIn: studentProfile.socialLinks?.linkedIn || "",
//                 twitter: studentProfile.socialLinks?.twitter || ""
//             },
//             skills: studentProfile.skills?.length > 0 ? studentProfile.skills : [""],
//             achievements: studentProfile.achievements?.length > 0 ? studentProfile.achievements : [initialAchievement],
//             // For projects, ensure technologiesUsed is an array,
//             // and initialize with an empty string if it's empty to show one input field
//             projects: studentProfile.projects?.length > 0
//                 ? studentProfile.projects.map(project => ({
//                     ...project,
//                     technologiesUsed: project.technologiesUsed?.length > 0 ? project.technologiesUsed : [""]
//                 }))
//                 : [{ ...initialProject, technologiesUsed: [""] }], // Initialize new project with one empty tech field
//             certificates: studentProfile.certificates?.length > 0 ? studentProfile.certificates : [initialCertificate],
//         });

//         setPreviewImage(studentProfile.profileImage || "");
//     }, [studentProfile, navigate]);

//     // Handler for regular input fields (name, email, branch, batch, about)
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     // Handler for social links
//     const handleSocialLinkChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             socialLinks: {
//                 ...prev.socialLinks,
//                 [name]: value
//             }
//         }));
//     };

//     // Handler for profile image file input
//     const handleProfileImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData((prev) => ({ ...prev, profileImage: file }));
//             setPreviewImage(URL.createObjectURL(file)); // For instant preview
//         }
//     };

//     // Handler for individual skill changes
//     const handleSkillChange = (index, value) => {
//         setFormData((prev) => {
//             const updatedSkills = [...prev.skills];
//             updatedSkills[index] = value;
//             return { ...prev, skills: updatedSkills };
//         });
//     };

//     // Handler to add a new skill
//     const handleAddSkill = () => {
//         setFormData((prev) => ({
//             ...prev,
//             skills: [...prev.skills, ""], // Add an empty string for a new skill
//         }));
//     };

//     // Handler to remove a skill
//     const handleRemoveSkill = (index) => {
//         setFormData((prev) => {
//             const updatedSkills = prev.skills.filter((_, i) => i !== index);
//             // Ensure there's always at least one empty skill field
//             return { ...prev, skills: updatedSkills.length > 0 ? updatedSkills : [""] };
//         });
//     };


//     // Generic handler for changes in array sub-documents (achievements, projects, certificates)
//     const handleArrayItemChange = (arrayName, itemIndex, field, value) => {
//         setFormData((prev) => {
//             const updatedArray = [...prev[arrayName]];
//             if (arrayName === "projects" && field === "completionDate") {
//                 updatedArray[itemIndex][field] = value;
//             } else {
//                 updatedArray[itemIndex][field] = value;
//             }
//             return { ...prev, [arrayName]: updatedArray };
//         });
//     };

//     // New: Handlers for technologiesUsed array within projects
//     const handleTechnologyChange = (projectIndex, techIndex, value) => {
//         setFormData((prev) => {
//             const updatedProjects = [...prev.projects];
//             updatedProjects[projectIndex].technologiesUsed[techIndex] = value;
//             return { ...prev, projects: updatedProjects };
//         });
//     };

//     const handleAddTechnology = (projectIndex) => {
//         setFormData((prev) => {
//             const updatedProjects = [...prev.projects];
//             updatedProjects[projectIndex].technologiesUsed.push("");
//             return { ...prev, projects: updatedProjects };
//         });
//     };

//     const handleRemoveTechnology = (projectIndex, techIndex) => {
//         setFormData((prev) => {
//             const updatedProjects = [...prev.projects];
//             const updatedTechnologies = updatedProjects[projectIndex].technologiesUsed.filter((_, i) => i !== techIndex);
//             updatedProjects[projectIndex].technologiesUsed = updatedTechnologies.length > 0 ? updatedTechnologies : [""]; // Keep at least one empty
//             return { ...prev, projects: updatedProjects };
//         });
//     };


//     // Handler for project image file input (specific to projects array)
//     const handleProjectImageChange = (index, file) => {
//         setFormData((prev) => {
//             const updatedProjects = [...prev.projects];
//             updatedProjects[index].projectImageFile = file; // Store the file temporarily
//             // Optional: You might want a local preview for project image as well
//             return { ...prev, projects: updatedProjects };
//         });
//     };


//     // Handler to add a new item to an array sub-document (for achievements, projects, certificates)
//     const handleAddArrayItem = (arrayName) => {
//         setFormData((prev) => {
//             let newItem;
//             if (arrayName === "achievements") {
//                 newItem = { ...initialAchievement };
//             } else if (arrayName === "projects") {
//                 newItem = { ...initialProject, technologiesUsed: [""] }; // New project starts with one empty tech field
//             } else if (arrayName === "certificates") {
//                 newItem = { ...initialCertificate };
//             }
//             return { ...prev, [arrayName]: [...prev[arrayName], newItem] };
//         });
//     };

//     // Handler to remove an item from an array sub-document (for achievements, projects, certificates)
//     const handleRemoveArrayItem = (arrayName, index) => {
//         setFormData((prev) => {
//             const updatedArray = prev[arrayName].filter((_, i) => i !== index);
//             // Ensure there's always at least one empty item if the array becomes empty after removal
//             if (updatedArray.length === 0) {
//                 if (arrayName === "achievements") updatedArray.push({ ...initialAchievement });
//                 if (arrayName === "projects") updatedArray.push({ ...initialProject, technologiesUsed: [""] }); // Re-add with an empty tech field
//                 if (arrayName === "certificates") updatedArray.push({ ...initialCertificate });
//             }
//             return { ...prev, [arrayName]: updatedArray };
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const data = new FormData();

//             // Append all string/number fields directly
//             data.append("name", formData.name);
//             data.append("email", formData.email);
//             data.append("branch", formData.branch);
//             data.append("batch", formData.batch);
//             data.append("about", formData.about);

//             // Append socialLinks as a JSON string
//             data.append("socialLinks", JSON.stringify(formData.socialLinks));

//             // Append skills as a JSON string (filter out empty strings)
//             data.append("skills", JSON.stringify(formData.skills.filter(skill => skill.trim() !== "")));

//             // Append profile image if a new one is selected
//             if (formData.profileImage) {
//                 data.append("profileImage", formData.profileImage);
//             }

//             // Prepare achievements and certificates for submission
//             // Filter out empty technology strings from projects before stringifying
//             const projectsToSubmit = formData.projects.map(project => {
//                 const { projectImageFile, ...rest } = project; // Exclude projectImageFile
//                 return {
//                     ...rest,
//                     technologiesUsed: project.technologiesUsed.filter(tech => tech.trim() !== "")
//                 };
//             });


//             // Append array fields as JSON strings
//             data.append("achievements", JSON.stringify(formData.achievements));
//             data.append("projects", JSON.stringify(projectsToSubmit));
//             data.append("certificates", JSON.stringify(formData.certificates));

//             // Append individual project images
//             formData.projects.forEach((project, index) => {
//                 if (project.projectImageFile) {
//                     data.append(`projectImage_${index}`, project.projectImageFile);
//                 }
//             });

//             const res = await axios.put(
//                 `${BACKEND_URL}/student/${studentProfile._id}`,
//                 data,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }
//             );
//             console.log("Update successful:", res.data);
//             setStudentProfile(res.data.student);
//             navigate(isAdmin ? "/batches" : "/student-profile");
//         } catch (error) {
//             console.error("Update failed:", error?.response?.data?.message || error.message);
//             // Optionally, display an error message to the user
//         }
//     };

//     const handleDelete = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.delete(
//                 `${BACKEND_URL}/student/${studentProfile.user}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             console.log("Delete successful:", res.data);
//             navigate("/batches");
//         } catch (error) {
//             console.error("Delete failed:", error?.response?.data?.message || error.message);
//             // Optionally, display an error message to the user
//         }
//     };

//     return (
//         <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
//             <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Student Profile</h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Basic Information */}
//                 <div className="border-b pb-4">
//                     <h3 className="text-xl font-semibold text-gray-700 mb-3">Basic Information</h3>
//                     {["name", "email", "branch", "batch", "about"].map((field) => (
//                         <div key={field} className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
//                                 {field === 'email' ? 'Email (Cannot be changed)' : field.replace(/([A-Z])/g, ' $1').trim()}
//                             </label>
//                             <input
//                                 type="text"
//                                 name={field}
//                                 className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                                 value={formData[field]}
//                                 onChange={handleChange}
//                                 readOnly={field === 'email'}
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Social Links */}
//                 <div className="border-b pb-4">
//                     <h3 className="text-xl font-semibold text-gray-700 mb-3">Social Links</h3>
//                     {Object.keys(formData.socialLinks).map((field) => (
//                         <div key={field} className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
//                                 {field} link</label>
//                             <input
//                                 type="url"
//                                 name={field}
//                                 className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                                 value={formData.socialLinks[field]}
//                                 onChange={handleSocialLinkChange}
//                                 placeholder={`Enter your ${field} URL`}
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Skills - Now with Add/Remove buttons */}
//                 <div className="border-b pb-4">
//                     <div className="flex justify-between items-center mb-3">
//                         <h3 className="text-xl font-semibold text-gray-700">Skills</h3>
//                         <button
//                             type="button"
//                             onClick={handleAddSkill}
//                             className="bg-green-500 text-white px-3 py-1 rounded-full text-lg font-bold hover:bg-green-600 transition-colors"
//                             title="Add new skill"
//                         >
//                             +
//                         </button>
//                     </div>
//                     {formData.skills.map((skill, index) => (
//                         <div key={`skill-${index}`} className="flex items-center mb-2 gap-2">
//                             <input
//                                 type="text"
//                                 className="flex-grow border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                                 value={skill}
//                                 onChange={(e) => handleSkillChange(index, e.target.value)}
//                                 placeholder="Enter a skill (e.g., JavaScript)"
//                             />
//                             {formData.skills.length > 1 && (
//                                 <button
//                                     type="button"
//                                     onClick={() => handleRemoveSkill(index)}
//                                     className="text-red-500 hover:text-red-700 font-bold p-2"
//                                     title="Remove skill"
//                                 >
//                                     &times;
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Profile Image */}
//                 <div className="border-b pb-4">
//                     <h3 className="text-xl font-semibold text-gray-700 mb-3">Profile Image</h3>
//                     <input
//                         type="file"
//                         name="profileImage"
//                         accept="image/*"
//                         onChange={handleProfileImageChange}
//                         className="w-full text-sm text-gray-500
//                                    file:mr-4 file:py-2 file:px-4
//                                    file:rounded-full file:border-0
//                                    file:text-sm file:font-semibold
//                                    file:bg-blue-50 file:text-blue-700
//                                    hover:file:bg-blue-100"
//                     />
//                     {previewImage && (
//                         <img src={previewImage} alt="Profile Preview" className="mt-4 w-32 h-32 object-cover rounded-full shadow-md" />
//                     )}
//                 </div>

//                 {/* Dynamic Array Fields: Achievements, Projects, Certificates */}
//                 {["achievements", "projects", "certificates"].map((arrayName) => (
//                     <div key={arrayName} className="border-b pb-4">
//                         <div className="flex justify-between items-center mb-3">
//                             <h3 className="text-xl font-semibold text-gray-700 capitalize">{arrayName}</h3>
//                             <button
//                                 type="button"
//                                 onClick={() => handleAddArrayItem(arrayName)}
//                                 className="bg-green-500 text-white px-3 py-1 rounded-full text-lg font-bold hover:bg-green-600 transition-colors"
//                                 title={`Add new ${arrayName.slice(0, -1)}`}
//                             >
//                                 +
//                             </button>
//                         </div>

//                         {formData[arrayName].map((item, index) => (
//                             <div key={`${arrayName}-${index}`} className="bg-gray-50 p-4 rounded-md shadow-sm mb-4 border border-gray-200">
//                                 <div className="flex justify-end">
//                                     {formData[arrayName].length > 1 && (
//                                         <button
//                                             type="button"
//                                             onClick={() => handleRemoveArrayItem(arrayName, index)}
//                                             className="text-red-500 hover:text-red-700 font-bold"
//                                             title={`Remove this ${arrayName.slice(0, -1)}`}
//                                         >
//                                             &times;
//                                         </button>
//                                     )}
//                                 </div>
//                                 {Object.keys(arrayName === "achievements" ? initialAchievement : arrayName === "projects" ? initialProject : initialCertificate).map((field) => (
//                                     <div key={`${arrayName}-${index}-${field}`} className="mb-3">
//                                         <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
//                                             {field.replace(/([A-Z])/g, ' $1').trim()}
//                                             {
//                                                 (arrayName === "achievements" && field === "title") ||
//                                                     (arrayName === "projects" && (field === "title" || field === "description")) ||
//                                                     (arrayName === "certificates" && field === "name")
//                                                     ? <span className="text-red-500">*</span> : null
//                                             }
//                                         </label>
//                                         {
//                                             (field === "description" || (arrayName === "about" && field === "description")) ? (
//                                                 <textarea
//                                                     className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                                                     rows="3"
//                                                     value={item[field] || ""}
//                                                     onChange={(e) =>
//                                                         handleArrayItemChange(arrayName, index, field, e.target.value)
//                                                     }
//                                                 ></textarea>
//                                             ) : field === "completionDate" || field === "date" || field === "issueDate" ? (
//                                                 <input
//                                                     type="date"
//                                                     className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                                                     value={
//                                                         item[field]
//                                                             ? new Date(item[field]).toISOString().split('T')[0]
//                                                             : ""
//                                                     }
//                                                     onChange={(e) =>
//                                                         handleArrayItemChange(arrayName, index, field, e.target.value)
//                                                     }
//                                                 />
//                                             ) : field === "projectImage" ? (
//                                                 <>
//                                                     <input
//                                                         type="file"
//                                                         accept="image/*"
//                                                         onChange={(e) => handleProjectImageChange(index, e.target.files[0])}
//                                                         className="w-full text-sm text-gray-500
//                                                                    file:mr-4 file:py-2 file:px-4
//                                                                    file:rounded-full file:border-0
//                                                                    file:text-sm file:font-semibold
//                                                                    file:bg-purple-50 file:text-purple-700
//                                                                    hover:file:bg-purple-100"
//                                                     />
//                                                     {(item.projectImage || item.projectImageFile) && (
//                                                         <img
//                                                             src={item.projectImageFile ? URL.createObjectURL(item.projectImageFile) : item.projectImage}
//                                                             alt="Project Preview"
//                                                             className="mt-2 w-24 h-24 object-cover rounded-md shadow-sm"
//                                                         />
//                                                     )}
//                                                 </>
//                                             ) : field === "technologiesUsed" ? ( // Dynamic inputs for technologiesUsed
//                                                 <div className="space-y-2">
//                                                     <div className="flex justify-between items-center mb-1">
//                                                         <span className="text-sm font-medium text-gray-700">Technologies:</span>
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleAddTechnology(index)} // Pass project index
//                                                             className="bg-green-500 text-white px-2 py-0.5 rounded-full text-sm font-bold hover:bg-green-600 transition-colors"
//                                                             title="Add technology"
//                                                         >
//                                                             +
//                                                         </button>
//                                                     </div>
//                                                     {item.technologiesUsed.map((tech, techIndex) => (
//                                                         <div key={`tech-${index}-${techIndex}`} className="flex items-center gap-2">
//                                                             <input
//                                                                 type="text"
//                                                                 className="flex-grow border border-gray-300 px-3 py-1 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                                                 value={tech}
//                                                                 onChange={(e) => handleTechnologyChange(index, techIndex, e.target.value)}
//                                                                 placeholder="e.g., React, Node.js"
//                                                             />
//                                                             {item.technologiesUsed.length > 1 && (
//                                                                 <button
//                                                                     type="button"
//                                                                     onClick={() => handleRemoveTechnology(index, techIndex)}
//                                                                     className="text-red-500 hover:text-red-700 font-bold text-lg"
//                                                                     title="Remove technology"
//                                                                 >
//                                                                     &times;
//                                                                 </button>
//                                                             )}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             ) : ( // Default text/url input
//                                                 <input
//                                                     type={
//                                                         (field.includes("Link") || field.includes("Repo")) ? "url" : "text"
//                                                     }
//                                                     className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                                                     value={item[field] || ""}
//                                                     onChange={(e) =>
//                                                         handleArrayItemChange(arrayName, index, field, e.target.value)
//                                                     }
//                                                     placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
//                                                 />
//                                             )
//                                         }
//                                     </div>
//                                 ))}
//                             </div>
//                         ))}
//                     </div>
//                 ))}

//                 {/* Action Buttons */}
//                 <div className="flex items-center justify-between pt-6">
//                     <button
//                         type="submit"
//                         className="bg-[#002277] text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors duration-200 ease-in-out shadow-md"
//                     >
//                         Save Changes
//                     </button>
//                     {isAdmin && (
//                         <button
//                             onClick={handleDelete}
//                             className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200 ease-in-out shadow-md"
//                         >
//                             Delete Profile
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default EditableStudentProfile;


import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentEditContext from "../../context/StudentEditContext";
import BACKEND_URL from "../../utils/axiosConfig";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

// Import react-icons
import {
    FaUser, FaEnvelope, FaCodeBranch, FaGraduationCap, FaInfoCircle, 
    FaGithub, FaLinkedin, FaTwitter, 
    FaTools, FaPlus, FaMinus, FaTimes, FaArrowRight, 
    FaAward,
    FaProjectDiagram, 
    FaCertificate, 
    FaLink, FaCalendarAlt, FaTag, FaUpload
} from 'react-icons/fa';

const EditableStudentProfile = () => {
    const { studentProfile, setStudentProfile } = useContext(StudentEditContext);
    const { isAdmin } = useContext(AuthContext);

    const navigate = useNavigate();

    // Initial state for new array items
    const initialAchievement = { title: "", description: "", date: "" };
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
            projects: studentProfile.projects?.length > 0
                ? studentProfile.projects.map(project => ({
                    ...project,
                    technologiesUsed: project.technologiesUsed?.length > 0 ? project.technologiesUsed : [""]
                }))
                : [{ ...initialProject, technologiesUsed: [""] }],
            certificates: studentProfile.certificates?.length > 0 ? studentProfile.certificates : [initialCertificate],
        });

        setPreviewImage(studentProfile.profileImage || "");
    }, [studentProfile, navigate]);

    // Helper to check if an array item is essentially empty
    const isItemEmpty = (item, initialTemplate) => {
        if (!item) return true; 

        for (const key in initialTemplate) {
            if (key === "technologiesUsed") {
                if (item[key] && item[key].some(tech => tech.trim() !== "")) {
                    return false;
                }
            } else if (typeof item[key] === 'string' && item[key].trim() !== "") {
                return false;
            }
        }
        return true;
    };


    // Handler for regular input fields (name, email, branch, batch)
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
            setPreviewImage(URL.createObjectURL(file)); 
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
            skills: [...prev.skills, ""], 
        }));
    };

    // Handler to remove a skill
    const handleRemoveSkill = (index) => {
        setFormData((prev) => {
            const updatedSkills = prev.skills.filter((_, i) => i !== index);
            return { ...prev, skills: updatedSkills.length > 0 ? updatedSkills : [""] };
        });
    };


    // Generic handler for changes in array sub-documents (achievements, projects, certificates)
    const handleArrayItemChange = (arrayName, itemIndex, field, value) => {
        setFormData((prev) => {
            const updatedArray = [...prev[arrayName]];
            updatedArray[itemIndex][field] = value;
            return { ...prev, [arrayName]: updatedArray };
        });
    };

    // Handlers for technologiesUsed array within projects
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
            updatedProjects[projectIndex].technologiesUsed = updatedTechnologies.length > 0 ? updatedTechnologies : [""]; 
            return { ...prev, projects: updatedProjects };
        });
    };


    // Handler for project image file input 
    const handleProjectImageChange = (index, file) => {
        setFormData((prev) => {
            const updatedProjects = [...prev.projects];
            updatedProjects[index].projectImageFile = file; 
            return { ...prev, projects: updatedProjects };
        });
    };


    // Handler to add a new item to an array sub-document
    const handleAddArrayItem = (arrayName) => {
        setFormData((prev) => {
            let newItem;
            if (arrayName === "achievements") {
                newItem = { ...initialAchievement };
            } else if (arrayName === "projects") {
                newItem = { ...initialProject, technologiesUsed: [""] };
            } else if (arrayName === "certificates") {
                newItem = { ...initialCertificate };
            }
            return { ...prev, [arrayName]: [...prev[arrayName], newItem] };
        });
    };

    // Handler to remove an item from an array sub-document
    const handleRemoveArrayItem = (arrayName, index) => {
        setFormData((prev) => {
            const updatedArray = prev[arrayName].filter((_, i) => i !== index);

            if (updatedArray.length === 0) {
                if (arrayName === "achievements") updatedArray.push({ ...initialAchievement });
                if (arrayName === "projects") updatedArray.push({ ...initialProject, technologiesUsed: [""] });
                if (arrayName === "certificates") updatedArray.push({ ...initialCertificate });
            }
            return { ...prev, [arrayName]: updatedArray };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("branch", formData.branch);
            data.append("batch", formData.batch);
            data.append("about", formData.about); 
            data.append("socialLinks", JSON.stringify(formData.socialLinks));
            data.append("skills", JSON.stringify(formData.skills.filter(skill => skill.trim() !== "")));

            if (formData.profileImage) {
                data.append("profileImage", formData.profileImage);
            }
            const projectsToSubmit = formData.projects.map(project => {
                const { projectImageFile, ...rest } = project;
                return {
                    ...rest,
                    technologiesUsed: project.technologiesUsed.filter(tech => tech.trim() !== "")
                };
            });

            data.append("achievements", JSON.stringify(formData.achievements));
            data.append("projects", JSON.stringify(projectsToSubmit));
            data.append("certificates", JSON.stringify(formData.certificates));

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
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-20 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">Edit Student Profile</h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-8">
                            {/* Basic Information */}
                            <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                                    <FaUser className="mr-3 text-blue-600" /> Basic Information
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { id: "name", label: "Name", icon: <FaUser /> },
                                        { id: "email", label: "Email (Cannot be changed)", icon: <FaEnvelope /> },
                                        { id: "branch", label: "Branch", icon: <FaCodeBranch /> },
                                        { id: "batch", label: "Batch", icon: <FaGraduationCap /> }
                                    ].map((field) => (
                                        <div key={field.id}>
                                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                                {field.icon && <span className="mr-2 text-gray-500">{field.icon}</span>}
                                                {field.label}
                                                {field.id !== 'email' && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                            <input
                                                type="text"
                                                name={field.id}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={formData[field.id]}
                                                onChange={handleChange}
                                                readOnly={field.id === 'email'}
                                                required={field.id !== 'email'}
                                            />
                                        </div>
                                    ))}
                                    {/* About  */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                            <FaInfoCircle className="mr-2 text-gray-500" /> About <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <textarea
                                            name="about"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                            rows="4"
                                            value={formData.about}
                                            onChange={handleChange}
                                            placeholder="Tell us about yourself..."
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Image */}
                            <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                                    <FaUpload className="mr-3 text-yellow-600" /> Profile Image
                                </h3>
                                <input
                                    type="file"
                                    name="profileImage"
                                    accept="image/*"
                                    onChange={handleProfileImageChange}
                                    className="w-full text-sm text-gray-700
                                               file:mr-4 file:py-2 file:px-4
                                               file:rounded-full file:border-0
                                               file:text-sm file:font-semibold
                                               file:bg-indigo-50 file:text-indigo-700
                                               hover:file:bg-indigo-100 cursor-pointer transition duration-150 ease-in-out"
                                />
                                {previewImage && (
                                    <img src={previewImage} alt="Profile Preview" className="mt-5 w-36 h-36 object-cover rounded-full shadow-lg border-4 border-white ring-2 ring-gray-200" />
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Social Links */}
                            <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                                    <FaLink className="mr-3 text-purple-600" /> Social Links
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { id: "github", label: "GitHub Link", icon: <FaGithub /> },
                                        { id: "linkedIn", label: "LinkedIn Link", icon: <FaLinkedin /> },
                                        { id: "twitter", label: "Twitter Link", icon: <FaTwitter /> }
                                    ].map((field) => (
                                        <div key={field.id}>
                                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                                {field.icon && <span className="mr-2 text-gray-500">{field.icon}</span>}
                                                {field.label}
                                            </label>
                                            <input
                                                type="url"
                                                name={field.id}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={formData.socialLinks[field.id]}
                                                onChange={handleSocialLinkChange}
                                                placeholder={`Enter your ${field.label.split(' ')[0]} URL`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                                <div className="flex justify-between items-center mb-5">
                                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                        <FaTools className="mr-3 text-indigo-600" /> Skills
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={handleAddSkill}
                                        className="bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1 shadow-md"
                                    >
                                        <FaPlus className="text-sm" /> Add Skill
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.skills.map((skill, index) => (
                                        <div key={`skill-${index}`} className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                className="flex-grow border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-green-500 focus:border-green-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={skill}
                                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                                placeholder="e.g., JavaScript, React, Python"
                                            />
                                            {formData.skills.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSkill(index)}
                                                    className="text-red-500 hover:text-red-700 font-bold p-2 text-xl leading-none"
                                                    title="Remove skill"
                                                >
                                                    <FaMinus />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-8"> 
                            {/* Achievements Section */}
                            <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                                <div className="flex justify-between items-center mb-5">
                                    <h3 className="text-2xl font-bold text-gray-800 capitalize flex items-center">
                                        <FaAward className="mr-3 text-teal-600" /> Achievements
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => handleAddArrayItem("achievements")}
                                        className="bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center gap-1 shadow-md"
                                        title="Add new achievement"
                                    >
                                        <FaPlus className="text-sm" /> Add Achievement
                                    </button>
                                </div>
                                
                                {(formData.achievements.length > 1 || !isItemEmpty(formData.achievements[0], initialAchievement)) && (
                                    <div className="space-y-6">
                                        {formData.achievements.map((item, index) => {
                                            if (formData.achievements.length === 1 && isItemEmpty(item, initialAchievement)) {
                                                return null;
                                            }
                                            return (
                                                <div key={`achievements-${index}`} className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-100 relative">
                                                    {formData.achievements.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveArrayItem("achievements", index)}
                                                            className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold text-xl transition duration-150 ease-in-out"
                                                            title="Remove this achievement"
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    )}
                                                    <div className="grid grid-cols-1 gap-4"> 
                                                        <div>
                                                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaTag className="mr-2 text-gray-500" /> Title <span className="text-red-500 ml-1">*</span></label>
                                                            <input
                                                                type="text"
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                                value={item.title || ""}
                                                                onChange={(e) => handleArrayItemChange("achievements", index, "title", e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaInfoCircle className="mr-2 text-gray-500" /> Description</label>
                                                            <textarea
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                                rows="3"
                                                                value={item.description || ""}
                                                                onChange={(e) => handleArrayItemChange("achievements", index, "description", e.target.value)}
                                                                placeholder="Briefly describe your achievement"
                                                            ></textarea>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaCalendarAlt className="mr-2 text-gray-500" /> Date</label>
                                                            <input
                                                                type="date"
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                                value={item.date ? new Date(item.date).toISOString().split('T')[0] : ""}
                                                                onChange={(e) => handleArrayItemChange("achievements", index, "date", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Certificates Section */}
                            <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                                <div className="flex justify-between items-center mb-5">
                                    <h3 className="text-2xl font-bold text-gray-800 capitalize flex items-center">
                                        <FaCertificate className="mr-3 text-teal-600" /> Certificates
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => handleAddArrayItem("certificates")}
                                        className="bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center gap-1 shadow-md"
                                        title="Add new certificate"
                                    >
                                        <FaPlus className="text-sm" /> Add Certificate
                                    </button>
                                </div>
                                {(formData.certificates.length > 1 || !isItemEmpty(formData.certificates[0], initialCertificate)) && (
                                    <div className="space-y-6">
                                        {formData.certificates.map((item, index) => {
                                            if (formData.certificates.length === 1 && isItemEmpty(item, initialCertificate)) {
                                                return null;
                                            }
                                            return (
                                                <div key={`certificates-${index}`} className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-100 relative">
                                                    {formData.certificates.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveArrayItem("certificates", index)}
                                                            className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold text-xl transition duration-150 ease-in-out"
                                                            title="Remove this certificate"
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    )}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
                                                        <div>
                                                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaTag className="mr-2 text-gray-500" /> Name <span className="text-red-500 ml-1">*</span></label>
                                                            <input
                                                                type="text"
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                                value={item.name || ""}
                                                                onChange={(e) => handleArrayItemChange("certificates", index, "name", e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaUser className="mr-2 text-gray-500" /> Issued By</label>
                                                            <input
                                                                type="text"
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                                value={item.issuedBy || ""}
                                                                onChange={(e) => handleArrayItemChange("certificates", index, "issuedBy", e.target.value)}
                                                                placeholder="e.g., Coursera, Udemy"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaCalendarAlt className="mr-2 text-gray-500" /> Issue Date</label>
                                                            <input
                                                                type="date"
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                                value={item.issueDate ? new Date(item.issueDate).toISOString().split('T')[0] : ""}
                                                                onChange={(e) => handleArrayItemChange("certificates", index, "issueDate", e.target.value)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaLink className="mr-2 text-gray-500" /> View Link</label>
                                                            <input
                                                                type="url"
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                                value={item.viewLink || ""}
                                                                onChange={(e) => handleArrayItemChange("certificates", index, "viewLink", e.target.value)}
                                                                placeholder="Link to verify certificate"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column for Projects */}
                        <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200 h-fit">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="text-2xl font-bold text-gray-800 capitalize flex items-center">
                                    <FaProjectDiagram className="mr-3 text-teal-600" /> Projects
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => handleAddArrayItem("projects")}
                                    className="bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center gap-1 shadow-md"
                                    title="Add new project"
                                >
                                    <FaPlus className="text-sm" /> Add Project
                                </button>
                            </div>
                            {(formData.projects.length > 1 || !isItemEmpty(formData.projects[0], initialProject)) && (
                                <div className="space-y-6">
                                    {formData.projects.map((item, index) => {
                                        if (formData.projects.length === 1 && isItemEmpty(item, initialProject)) {
                                            return null;
                                        }
                                        return (
                                            <div key={`projects-${index}`} className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-100 relative">
                                                {formData.projects.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveArrayItem("projects", index)}
                                                        className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold text-xl transition duration-150 ease-in-out"
                                                        title="Remove this project"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                )}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {/* Project Fields */}
                                                    <div>
                                                        <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaTag className="mr-2 text-gray-500" /> Title <span className="text-red-500 ml-1">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                            value={item.title || ""}
                                                            onChange={(e) => handleArrayItemChange("projects", index, "title", e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaInfoCircle className="mr-2 text-gray-500" /> Description <span className="text-red-500 ml-1">*</span></label>
                                                        <textarea
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                            rows="3"
                                                            value={item.description || ""}
                                                            onChange={(e) => handleArrayItemChange("projects", index, "description", e.target.value)}
                                                            required
                                                        ></textarea>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaLink className="mr-2 text-gray-500" /> Project Link</label>
                                                        <input
                                                            type="url"
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                            value={item.projectLink || ""}
                                                            onChange={(e) => handleArrayItemChange("projects", index, "projectLink", e.target.value)}
                                                            placeholder="e.g., https://yourproject.com"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaLink className="mr-2 text-gray-500" /> GitHub Repo</label>
                                                        <input
                                                            type="url"
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                            value={item.githubRepo || ""}
                                                            onChange={(e) => handleArrayItemChange("projects", index, "githubRepo", e.target.value)}
                                                            placeholder="e.g., https://github.com/your/repo"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaTag className="mr-2 text-gray-500" /> Category</label>
                                                        <input
                                                            type="text"
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                            value={item.category || ""}
                                                            onChange={(e) => handleArrayItemChange("projects", index, "category", e.target.value)}
                                                            placeholder="e.g., Web Development, Mobile App"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaCalendarAlt className="mr-2 text-gray-500" /> Completion Date</label>
                                                        <input
                                                            type="date"
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                                            value={item.completionDate ? new Date(item.completionDate).toISOString().split('T')[0] : ""}
                                                            onChange={(e) => handleArrayItemChange("projects", index, "completionDate", e.target.value)}
                                                        />
                                                    </div>

                                                    {/* Technologies Used */}
                                                    <div className="sm:col-span-2 bg-gray-100 p-4 rounded-lg border border-gray-200">
                                                        <div className="flex justify-between items-center mb-3">
                                                            <span className="text-sm font-semibold text-gray-700 flex items-center">
                                                                <FaTools className="mr-2 text-gray-500" /> Technologies:
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleAddTechnology(index)}
                                                                className="bg-blue-900 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-1"
                                                                title="Add technology"
                                                            >
                                                                <FaPlus className="text-xs" /> Add Tech
                                                            </button>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {item.technologiesUsed.map((tech, techIndex) => (
                                                                <div key={`tech-${index}-${techIndex}`} className="flex items-center gap-2">
                                                                    <input
                                                                        type="text"
                                                                        className="flex-grow border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800"
                                                                        value={tech}
                                                                        onChange={(e) => handleTechnologyChange(index, techIndex, e.target.value)}
                                                                        placeholder="e.g., React, Node.js"
                                                                    />
                                                                    {item.technologiesUsed.length > 1 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleRemoveTechnology(index, techIndex)}
                                                                            className="text-red-500 hover:text-red-700 font-bold text-xl p-1 leading-none"
                                                                            title="Remove technology"
                                                                        >
                                                                            <FaMinus />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Project Image */}
                                                    <div className="sm:col-span-2">
                                                        <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center"><FaUpload className="mr-2 text-gray-500" /> Project Image</label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleProjectImageChange(index, e.target.files[0])}
                                                            className="w-full text-sm text-gray-700
                                                                       file:mr-4 file:py-2 file:px-4
                                                                       file:rounded-full file:border-0
                                                                       file:text-sm file:font-semibold
                                                                       file:bg-purple-50 file:text-purple-700
                                                                       hover:file:bg-purple-100 cursor-pointer"
                                                        />
                                                        {(item.projectImage || (item.projectImageFile && URL.createObjectURL(item.projectImageFile))) && (
                                                            <img
                                                                src={item.projectImageFile ? URL.createObjectURL(item.projectImageFile) : item.projectImage}
                                                                alt="Project Preview"
                                                                className="mt-3 w-32 h-32 object-cover rounded-md shadow-sm border border-gray-200"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>


                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-5 pt-8 pr-2">
                        <button
                            type="submit"
                            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-all duration-300 ease-in-out shadow-lg transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-2"
                        >
                            Save Changes <FaArrowRight className="ml-2" />
                        </button>
                        {isAdmin && (
                            <button
                                onClick={handleDelete}
                                type="button"
                                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-all duration-300 ease-in-out shadow-lg transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-2"
                            >
                                <FaTimes /> Delete Profile
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditableStudentProfile;