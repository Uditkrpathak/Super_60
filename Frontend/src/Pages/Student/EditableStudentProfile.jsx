import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentEditContext from "../../context/StudentEditContext";
import BACKEND_URL from "../../utils/axiosConfig";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

// Import react-icons for better UI/UX
import {
    FaUser, FaEnvelope, FaCodeBranch, FaGraduationCap, FaInfoCircle,
    FaGithub, FaLinkedin, FaTwitter,
    FaTools, FaPlus, FaMinus, FaTimes,
    FaAward, FaProjectDiagram, FaCertificate,
    FaLink, FaCalendarAlt, FaTag, FaUpload,
    FaRegBuilding, FaBriefcase , FaUniversity,
    FaExternalLinkAlt, FaBuilding, FaDollarSign,
    FaThList
} from 'react-icons/fa';
import { HiAcademicCap } from "react-icons/hi";

const EditableStudentProfile = () => {
    const { studentProfile, setStudentProfile } = useContext(StudentEditContext);
    const { isAdmin } = useContext(AuthContext); // Assuming AuthContext provides isAdmin

    const navigate = useNavigate();

    // Initial state templates for new array items
    const initialAchievement = { title: "", description: "", date: "" };
    const initialProject = {
        title: "",
        description: "",
        projectLink: "",
        technologiesUsed: [],
        projectImage: "", // This will hold the URL
        projectImageFile: null, // This will hold the File object for upload
        category: "",
        completionDate: "",
        githubRepo: "",
    };
    const initialCertificate = { name: "", issuedBy: "", issueDate: "", viewLink: "" };
    const initialInternship = { companyName: "", certificate: "", startDate: "", endDate: "" };
    const initialClient = { companyName: "", description: "", role: "", amount: "" };


    const [formData, setFormData] = useState({
        name: "",
        portfolioLink: "",
        academicRollNo: "",
        universityRollNo: "",
        joinedOn: "",
        placement: {
            placed: false,
            companyName: "",
            placedOn: "",
        },
        email: "",
        branch: "",
        batch: "",
        about: "",
        socialLinks: {
            github: "",
            linkedIn: "",
            twitter: ""
        },
        specialization: [],
        skills: [],
        profileImage: null, // This will hold the File object for upload
        achievements: [],
        projects: [],
        certificates: [],
        internship: [],
        client: [],
    });

    const [previewProfileImage, setPreviewProfileImage] = useState("");
    const [projectImagePreviews, setProjectImagePreviews] = useState({}); // Stores URLs for project image previews
    const [message, setMessage] = useState(null); // For success/error messages
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'

    const token = localStorage.getItem("token"); // Get auth token

    useEffect(() => {
        if (!studentProfile) {
            navigate('/batches'); // Redirect if no profile is selected for editing
            return;
        }

        // Initialize formData with existing studentProfile data
        setFormData({
            name: studentProfile.name || "",
            portfolioLink: studentProfile.portfolioLink || "",
            academicRollNo: studentProfile.academicRollNo || "",
            universityRollNo: studentProfile.universityRollNo || "",
            // Format date for input[type="date"]
            joinedOn: studentProfile.joinedOn ? new Date(studentProfile.joinedOn).toISOString().split('T')[0] : "",
            placement: {
                placed: studentProfile.placement?.placed || false,
                companyName: studentProfile.placement?.companyName || "",
                placedOn: studentProfile.placement?.placedOn ? new Date(studentProfile.placement.placedOn).toISOString().split('T')[0] : "",
            },
            email: studentProfile.email || "",
            branch: studentProfile.branch || "",
            batch: studentProfile.batch || "",
            about: studentProfile.about || "",
            socialLinks: {
                github: studentProfile.socialLinks?.github || "",
                linkedIn: studentProfile.socialLinks?.linkedIn || "",
                twitter: studentProfile.socialLinks?.twitter || ""
            },
            // Ensure arrays have at least one empty string/object if empty for initial input
            specialization: studentProfile.specialization?.length > 0 ? studentProfile.specialization : [""],
            skills: studentProfile.skills?.length > 0 ? studentProfile.skills : [""],
            profileImage: null, // Don't pre-fill file input with existing image
            achievements: studentProfile.achievements?.length > 0 ? studentProfile.achievements : [{ ...initialAchievement }],
            projects: studentProfile.projects?.length > 0
                ? studentProfile.projects.map(project => ({
                    ...project,
                    technologiesUsed: project.technologiesUsed?.length > 0 ? project.technologiesUsed : [""],
                    projectImageFile: null, // Don't pre-fill file input
                }))
                : [{ ...initialProject, technologiesUsed: [""] }],
            certificates: studentProfile.certificates?.length > 0 ? studentProfile.certificates : [{ ...initialCertificate }],
            internship: studentProfile.internship?.length > 0
                ? studentProfile.internship.map(item => ({
                    ...item,
                    startDate: item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : "",
                    endDate: item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : "",
                }))
                : [{ ...initialInternship }],
            client: studentProfile.client?.length > 0 ? studentProfile.client : [{ ...initialClient }],
        });

        // Set image previews
        setPreviewProfileImage(studentProfile.profileImage || "");
        const initialProjectImagePreviews = {};
        studentProfile.projects?.forEach((project, index) => {
            if (project.projectImage) {
                initialProjectImagePreviews[index] = project.projectImage;
            }
        });
        setProjectImagePreviews(initialProjectImagePreviews);

    }, [studentProfile, navigate]);

    // Helper to check if an array item (sub-document) is essentially empty
    const isItemEmpty = (item, initialTemplate) => {
        if (!item) return true;

        for (const key in initialTemplate) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
                const value = item[key];
                const initialValue = initialTemplate[key];

                if (Array.isArray(initialValue)) { // Handles arrays within sub-documents like technologiesUsed
                    if (Array.isArray(value) && value.some(val => typeof val === 'string' && val.trim() !== "")) {
                        return false;
                    }
                } else if (typeof initialValue === 'object' && initialValue !== null) {
                    // Recursive check for nested objects if applicable (not strictly needed for current model)
                } else if (typeof value === 'string' && value.trim() !== "") {
                    return false;
                } else if (typeof value === 'boolean' && value !== initialValue) {
                    return false;
                } else if (value instanceof Date && value.toISOString() !== initialValue) { // For date objects
                    return false;
                } else if (value && typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length > 0) {
                    // For objects that might contain data (e.g., placement)
                    return false;
                }
            }
        }
        return true;
    };


    // Handler for regular input fields
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

    // Handler for placement fields
    const handlePlacementChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            placement: {
                ...prev.placement,
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    // Handler for profile image file input
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, profileImage: file }));
            setPreviewProfileImage(URL.createObjectURL(file));
        } 
        // else {
        //     setFormData((prev) => ({ ...prev, profileImage: null }));
        //     // Revert to original if no new file is selected and there was an original image
        //     setPreviewProfileImage(studentProfile.profileImage || "");
        // }
    };

    // Generic handler for changes in array of strings (skills, specialization)
    const handleStringArrayChange = (arrayName, index, value) => {
        setFormData((prev) => {
            const updatedArray = [...prev[arrayName]];
            updatedArray[index] = value;
            return { ...prev, [arrayName]: updatedArray };
        });
    };

    // Generic handler to add a new string to an array
    const handleAddStringToArray = (arrayName) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: [...prev[arrayName], ""],
        }));
    };

    // Generic handler to remove a string from an array
    const handleRemoveStringFromArray = (arrayName, index) => {
        setFormData((prev) => {
            const updatedArray = prev[arrayName].filter((_, i) => i !== index);
            return { ...prev, [arrayName]: updatedArray.length > 0 ? updatedArray : [""] };
        });
    };

    // Generic handler for changes in array sub-documents (achievements, projects, certificates, internship, client)
    const handleArrayItemChange = (arrayName, itemIndex, field, value) => {
        setFormData((prev) => {
            const updatedArray = [...prev[arrayName]];
            // Special handling for date fields to ensure consistent format for input[type="date"]
            if (field.includes('Date')) {
                updatedArray[itemIndex][field] = value; // Value from date input is already YYYY-MM-DD
            } else {
                updatedArray[itemIndex][field] = value;
            }
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
            updatedProjects[index].projectImageFile = file; // Store the file object for upload
            // Also store the preview URL if a file is selected
            if (file) {
                setProjectImagePreviews(prevPreviews => ({
                    ...prevPreviews,
                    [index]: URL.createObjectURL(file)
                }));
            } else {
                // If file input is cleared, revert to original image URL or clear preview
                setProjectImagePreviews(prevPreviews => {
                    const newPreviews = { ...prevPreviews };
                    // If the project existed before, try to use its original image, otherwise clear
                    newPreviews[index] = studentProfile.projects[index]?.projectImage || "";
                    return newPreviews;
                });
            }
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
            } else if (arrayName === "internship") {
                newItem = { ...initialInternship };
            } else if (arrayName === "client") {
                newItem = { ...initialClient };
            }
            return { ...prev, [arrayName]: [...prev[arrayName], newItem] };
        });
    };

    // Handler to remove an item from an array sub-document
    const handleRemoveArrayItem = (arrayName, index) => {
        setFormData((prev) => {
            const updatedArray = prev[arrayName].filter((_, i) => i !== index);

            let initialTemplateToUse;
            if (arrayName === "achievements") initialTemplateToUse = initialAchievement;
            else if (arrayName === "projects") initialTemplateToUse = initialProject;
            else if (arrayName === "certificates") initialTemplateToUse = initialCertificate;
            else if (arrayName === "internship") initialTemplateToUse = initialInternship;
            else if (arrayName === "client") initialTemplateToUse = initialClient;

            if (updatedArray.length === 0) {
                // If all items are removed, add one empty item back for user convenience
                if (arrayName === "projects") {
                    updatedArray.push({ ...initialTemplateToUse, technologiesUsed: [""] });
                } else {
                    updatedArray.push({ ...initialTemplateToUse });
                }
            }

            // Remove project image preview if a project is removed
            if (arrayName === "projects") {
                setProjectImagePreviews(prevPreviews => {
                    const newPreviews = { ...prevPreviews };
                    delete newPreviews[index];
                    // Adjust indices for previews if items before 'index' are removed
                    const reindexedPreviews = {};
                    Object.keys(newPreviews).forEach(key => {
                        const numKey = parseInt(key);
                        if (numKey > index) {
                            reindexedPreviews[numKey - 1] = newPreviews[key];
                        } else {
                            reindexedPreviews[numKey] = newPreviews[key];
                        }
                    });
                    return reindexedPreviews;
                });
            }

            return { ...prev, [arrayName]: updatedArray };
        });
    };

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage(null);
            setMessageType("");
        }, 5000); // Message disappears after 5 seconds
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null); // Clear previous messages
        setMessageType("");

        try {
            const data = new FormData();

            // Append all top-level string/boolean/date fields
            data.append("name", formData.name);
            data.append("email", formData.email); // Email is readOnly, but send for backend check
            data.append("branch", formData.branch);
            data.append("batch", formData.batch);
            data.append("about", formData.about);
            data.append("portfolioLink", formData.portfolioLink);
            data.append("academicRollNo", formData.academicRollNo);
            data.append("universityRollNo", formData.universityRollNo);
            // Append joinedOn only if it has a value
            if (formData.joinedOn) {
                data.append("joinedOn", formData.joinedOn);
            } else {
                data.append("joinedOn", ""); // Send empty string if cleared to tell backend to clear it
            }


            // Stringify and append JSON objects/arrays
            data.append("socialLinks", JSON.stringify(formData.socialLinks));
            data.append("placement", JSON.stringify(formData.placement)); // Placement object

            // Filter out empty strings from string arrays before stringifying
            data.append("skills", JSON.stringify(formData.skills.filter(skill => skill.trim() !== "")));
            data.append("specialization", JSON.stringify(formData.specialization.filter(spec => spec.trim() !== "")));


            // Filter out empty sub-documents from arrays and prepare for submission
            const achievementsToSubmit = formData.achievements.filter(item => !isItemEmpty(item, initialAchievement));
            const certificatesToSubmit = formData.certificates.map(item => ({
                ...item,
                // Ensure date fields are sent as strings in YYYY-MM-DD format
                issueDate: item.issueDate || ""
            })).filter(item => !isItemEmpty(item, initialCertificate));

            const internshipsToSubmit = formData.internship.map(item => ({
                ...item,
                // Ensure date fields are sent as strings in YYYY-MM-DD format
                startDate: item.startDate || "",
                endDate: item.endDate || ""
            })).filter(item => !isItemEmpty(item, initialInternship));

            const clientsToSubmit = formData.client.filter(item => !isItemEmpty(item, initialClient));

            data.append("achievements", JSON.stringify(achievementsToSubmit));
            data.append("certificates", JSON.stringify(certificatesToSubmit));
            data.append("internship", JSON.stringify(internshipsToSubmit));
            data.append("client", JSON.stringify(clientsToSubmit));


            // Handle projects specially due to nested technologiesUsed and potential image files
            const projectsToSubmit = formData.projects.map(project => {
                // Exclude projectImageFile from the JSON data, as it's sent separately
                const { projectImageFile, ...rest } = project;
                return {
                    ...rest,
                    // Filter empty technologiesUsed before sending
                    technologiesUsed: project.technologiesUsed.filter(tech => tech.trim() !== ""),
                    completionDate: project.completionDate || "", // Ensure date is sent as string
                };
            }).filter(item => !isItemEmpty(item, initialProject)); // Filter out entirely empty projects

            data.append("projects", JSON.stringify(projectsToSubmit));

            // Append profile image file
            if (formData.profileImage) {
                data.append("profileImage", formData.profileImage);
            }

            // Append project image files
            formData.projects.forEach((project, index) => {
                if (project.projectImageFile) {
                    data.append(`projectImage_${index}`, project.projectImageFile);
                } else {
                    // If a project had an image but it was cleared, send an empty string for it
                    if (studentProfile.projects[index]?.projectImage) {
                        data.append(`projectImage_${index}`, "");
                    }
                }
            });


            const res = await axios.put(
                `${BACKEND_URL}/student/${studentProfile._id}`, // Use studentProfile._id for update
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', // Crucial for file uploads
                    },
                }
            );
            console.log("Update successful:", res.data);
            setStudentProfile(res.data.student); // Update context with the latest data
            showMessage("Profile updated successfully!", "success");
            navigate(isAdmin ? "/batches" : "/student-profile"); // Navigate back
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || "An unexpected error occurred.";
            console.error("Update failed:", errorMessage);
            showMessage(`Update failed: ${errorMessage}`, "error");
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this student's profile? This action cannot be undone.")) {
            return;
        }
        setMessage(null); // Clear previous messages
        setMessageType("");

        try {
            const res = await axios.delete(
                `${BACKEND_URL}/student/${studentProfile._id}`, // Use studentProfile._id for delete
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Delete successful:", res.data);
            showMessage("Profile deleted successfully!", "success");
            setStudentProfile(null); // Clear profile from context
            navigate("/batches"); // Redirect after deletion
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || "An unexpected error occurred.";
            console.error("Delete failed:", errorMessage);
            showMessage(`Delete failed: ${errorMessage}`, "error");
        }
    };

    if (!studentProfile) {
        return (
            <div className="flex justify-center items-center h-screen text-xl text-gray-700">
                Loading student profile or no profile selected...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">Edit Student Profile</h2>

                {message && (
                    <div className={`py-3 px-6 rounded-lg mb-6 text-center text-lg font-medium ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

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
                                        { id: "name", label: "Full Name", icon: <FaUser />, required: true },
                                        { id: "email", label: "Email (Cannot be changed)", icon: <FaEnvelope />, readOnly: true },
                                        { id: "branch", label: "Branch", icon: <FaCodeBranch />, required: true },
                                        { id: "batch", label: "Batch", icon: <FaGraduationCap />, required: true },
                                        { id: "portfolioLink", label: "Portfolio Link", icon: <FaExternalLinkAlt />, type: "url" },
                                        { id: "academicRollNo", label: "Academic Roll No.", icon: <HiAcademicCap  /> },
                                        { id: "universityRollNo", label: "University Roll No.", icon: <FaUniversity /> },
                                        { id: "joinedOn", label: "Joined On", icon: <FaCalendarAlt />, type: "date" },
                                    ].map((field) => (
                                        <div key={field.id}>
                                            <label htmlFor={field.id} className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                                {field.icon && <span className="mr-2 text-gray-500">{field.icon}</span>}
                                                {field.label}
                                                {field.required && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                            <input
                                                type={field.type || "text"}
                                                id={field.id}
                                                name={field.id}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={formData[field.id]}
                                                onChange={handleChange}
                                                readOnly={field.readOnly}
                                                required={field.required}
                                                placeholder={`Enter your ${field.label}`}
                                            />
                                        </div>
                                    ))}
                                    {/* About */}
                                    <div>
                                        <label htmlFor="about" className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                            <FaInfoCircle className="mr-2 text-gray-500" /> About <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <textarea
                                            id="about"
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
                                {previewProfileImage && (
                                    <div className="mt-5 relative w-36 h-36">
                                        <img src={previewProfileImage} alt="Profile Preview" className="w-full h-full object-cover rounded-full shadow-lg border-4 border-white ring-2 ring-gray-200" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreviewProfileImage("");
                                                setFormData(prev => ({ ...prev, profileImage: null }));
                                                // Manually clear the file input field
                                                const profileFileInput = document.querySelector('input[name="profileImage"]');
                                                if (profileFileInput) profileFileInput.value = null;
                                            }}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700"
                                            title="Remove image"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
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
                                        { id: "github", label: "GitHub", icon: <FaGithub />, type: "url" },
                                        { id: "linkedIn", label: "LinkedIn", icon: <FaLinkedin />, type: "url" },
                                        { id: "twitter", label: "Twitter (X)", icon: <FaTwitter />, type: "url" },
                                    ].map((field) => (
                                        <div key={field.id}>
                                            <label htmlFor={field.id} className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                                {field.icon && <span className="mr-2 text-gray-500">{field.icon}</span>}
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type || "text"}
                                                id={field.id}
                                                name={field.id}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={formData.socialLinks[field.id]}
                                                onChange={handleSocialLinkChange}
                                                placeholder={`Enter your ${field.label} profile URL`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                                    <FaTools className="mr-3 text-green-600" /> Skills
                                </h3>
                                <div className="space-y-3">
                                    {formData.skills.map((skill, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                className="flex-grow border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={skill}
                                                onChange={(e) => handleStringArrayChange("skills", index, e.target.value)}
                                                placeholder="e.g., JavaScript, Python"
                                            />
                                            {formData.skills.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveStringFromArray("skills", index)}
                                                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-150 ease-in-out"
                                                    title="Remove skill"
                                                >
                                                    <FaMinus className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleAddStringToArray("skills")}
                                        className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out"
                                    >
                                        <FaPlus className="mr-2" /> Add Skill
                                    </button>
                                </div>
                            </div>

                            {/* Specialization */}
                            <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                                    <FaTag className="mr-3 text-orange-600" /> Specialization
                                </h3>
                                <div className="space-y-3">
                                    {formData.specialization.map((spec, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                className="flex-grow border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={spec}
                                                onChange={(e) => handleStringArrayChange("specialization", index, e.target.value)}
                                                placeholder="e.g., Web Development, Machine Learning"
                                            />
                                            {formData.specialization.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveStringFromArray("specialization", index)}
                                                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-150 ease-in-out"
                                                    title="Remove specialization"
                                                >
                                                    <FaMinus className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleAddStringToArray("specialization")}
                                        className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out"
                                    >
                                        <FaPlus className="mr-2" /> Add Specialization
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Placement Information */}
                    <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                            <FaBriefcase className="mr-3 text-teal-600" /> Placement Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="placed"
                                    name="placed"
                                    checked={formData.placement.placed}
                                    onChange={handlePlacementChange}
                                    className="form-checkbox h-5 w-5 text-indigo-600"
                                />
                                <label htmlFor="placed" className="text-md font-medium text-gray-700">
                                    Placed
                                </label>
                            </div>
                            {formData.placement.placed && (
                                <div>
                            <div>
                                <label htmlFor="companyName" className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                    <FaBuilding className="mr-2 text-gray-500" /> Company Name
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                    value={formData.placement.companyName}
                                    onChange={handlePlacementChange}
                                    disabled={!formData.placement.placed}
                                    placeholder="e.g., Google, Microsoft"
                                />
                            </div>
                            <div>
                                <label htmlFor="placedOn" className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                    <FaCalendarAlt className="mr-2 text-gray-500" /> Placed On
                                </label>
                                <input
                                    type="date"
                                    id="placedOn"
                                    name="placedOn"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                    value={formData.placement.placedOn}
                                    onChange={handlePlacementChange}
                                    disabled={!formData.placement.placed}
                                />
                            </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                            <FaAward className="mr-3 text-yellow-500" /> Achievements
                        </h3>
                        <div className="space-y-6">
                            {formData.achievements.map((achievement, index) => (
                                <div key={index} className="border border-gray-300 p-5 rounded-lg relative bg-gray-50">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Achievement #{index + 1}</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label htmlFor={`achievement-title-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Title</label>
                                            <input
                                                type="text"
                                                id={`achievement-title-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={achievement.title}
                                                onChange={(e) => handleArrayItemChange("achievements", index, "title", e.target.value)}
                                                placeholder="e.g., Won Hackathon 2023"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`achievement-description-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Description</label>
                                            <textarea
                                                id={`achievement-description-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                rows="2"
                                                value={achievement.description}
                                                onChange={(e) => handleArrayItemChange("achievements", index, "description", e.target.value)}
                                                placeholder="Briefly describe your achievement"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor={`achievement-date-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Date</label>
                                            <input
                                                type="date"
                                                id={`achievement-date-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={achievement.date}
                                                onChange={(e) => handleArrayItemChange("achievements", index, "date", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {formData.achievements.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveArrayItem("achievements", index)}
                                            className="absolute top-3 right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-150 ease-in-out"
                                            title="Remove achievement"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddArrayItem("achievements")}
                                className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out"
                            >
                                <FaPlus className="mr-2" /> Add Achievement
                            </button>
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="bg-white py-7 px-2 md:px-7 rounded-xl shadow-md border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                            <FaProjectDiagram className="mr-3 text-blue-500" /> Projects
                        </h3>
                        <div className="space-y-8">
                            {formData.projects.map((project, projectIndex) => (
                                <div key={projectIndex} className="border border-gray-300 p-5 rounded-lg relative bg-gray-50">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Project #{projectIndex + 1}</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor={`project-title-${projectIndex}`} className="text-sm font-semibold text-gray-700 mb-1 block">Title</label>
                                            <input
                                                type="text"
                                                id={`project-title-${projectIndex}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={project.title}
                                                onChange={(e) => handleArrayItemChange("projects", projectIndex, "title", e.target.value)}
                                                placeholder="e.g., E-commerce Platform"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`project-description-${projectIndex}`} className="text-sm font-semibold text-gray-700 mb-1 block">Description</label>
                                            <textarea
                                                id={`project-description-${projectIndex}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                rows="3"
                                                value={project.description}
                                                onChange={(e) => handleArrayItemChange("projects", projectIndex, "description", e.target.value)}
                                                placeholder="Describe your project"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor={`project-link-${projectIndex}`} className="text-sm font-semibold text-gray-700 mb-1 block">Project Link</label>
                                            <input
                                                type="url"
                                                id={`project-link-${projectIndex}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={project.projectLink}
                                                onChange={(e) => handleArrayItemChange("projects", projectIndex, "projectLink", e.target.value)}
                                                placeholder="https://yourproject.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`github-repo-${projectIndex}`} className="text-sm font-semibold text-gray-700 mb-1 block">GitHub Repository</label>
                                            <input
                                                type="url"
                                                id={`github-repo-${projectIndex}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={project.githubRepo}
                                                onChange={(e) => handleArrayItemChange("projects", projectIndex, "githubRepo", e.target.value)}
                                                placeholder="https://github.com/your-repo"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`project-category-${projectIndex}`} className="text-sm font-semibold text-gray-700 mb-1 block">Category</label>
                                            <input
                                                type="text"
                                                id={`project-category-${projectIndex}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={project.category}
                                                onChange={(e) => handleArrayItemChange("projects", projectIndex, "category", e.target.value)}
                                                placeholder="e.g., Web Development, Mobile App, Data Science"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`project-completion-date-${projectIndex}`} className="text-sm font-semibold text-gray-700 mb-1 block">Completion Date</label>
                                            <input
                                                type="date"
                                                id={`project-completion-date-${projectIndex}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={project.completionDate}
                                                onChange={(e) => handleArrayItemChange("projects", projectIndex, "completionDate", e.target.value)}
                                            />
                                        </div>

                                        {/* Technologies Used */}
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-1 block">Technologies Used</label>
                                            <div className="space-y-2">
                                                {project.technologiesUsed.map((tech, techIndex) => (
                                                    <div key={techIndex} className="flex items-center gap-3">
                                                        <input
                                                            type="text"
                                                            className="flex-grow border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                            value={tech}
                                                            onChange={(e) => handleTechnologyChange(projectIndex, techIndex, e.target.value)}
                                                            placeholder="e.g., React, Node.js, MongoDB"
                                                        />
                                                        {project.technologiesUsed.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveTechnology(projectIndex, techIndex)}
                                                                className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-150 ease-in-out"
                                                                title="Remove technology"
                                                            >
                                                                <FaMinus className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddTechnology(projectIndex)}
                                                    className="mt-2 flex items-center px-3 py-1.5 bg-green-600 text-white font-medium rounded-lg text-sm hover:bg-green-700 transition duration-150 ease-in-out"
                                                >
                                                    <FaPlus className="mr-1.5" /> Add Technology
                                                </button>
                                            </div>
                                        </div>

                                        {/* Project Image Upload */}
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-1 block">Project Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleProjectImageChange(projectIndex, e.target.files[0])}
                                                className="w-full text-sm text-gray-700
                                                           file:mr-4 file:py-2 file:px-4
                                                           file:rounded-full file:border-0
                                                           file:text-sm file:font-semibold
                                                           file:bg-indigo-50 file:text-indigo-700
                                                           hover:file:bg-indigo-100 cursor-pointer transition duration-150 ease-in-out"
                                            />
                                            {projectImagePreviews[projectIndex] && (
                                                <div className="mt-4 relative w-48 h-auto">
                                                    <img src={projectImagePreviews[projectIndex]} alt="Project Preview" className="w-full h-full object-cover rounded-lg shadow-md border border-gray-200" />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleProjectImageChange(projectIndex, null)} // Pass null to clear
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 text-xs hover:bg-red-700"
                                                        title="Remove project image"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {formData.projects.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveArrayItem("projects", projectIndex)}
                                            className="absolute top-3 right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-150 ease-in-out"
                                            title="Remove project"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddArrayItem("projects")}
                                className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out"
                            >
                                <FaPlus className="mr-2" /> Add Project
                            </button>
                        </div>
                    </div>

                    {/* Certificates */}
                    <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                            <FaCertificate className="mr-3 text-purple-500" /> Certificates
                        </h3>
                        <div className="space-y-6">
                            {formData.certificates.map((certificate, index) => (
                                <div key={index} className="border border-gray-300 p-5 rounded-lg relative bg-gray-50">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Certificate #{index + 1}</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label htmlFor={`certificate-name-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Name</label>
                                            <input
                                                type="text"
                                                id={`certificate-name-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={certificate.name}
                                                onChange={(e) => handleArrayItemChange("certificates", index, "name", e.target.value)}
                                                placeholder="e.g., AWS Certified Developer"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`certificate-issuedBy-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Issued By</label>
                                            <input
                                                type="text"
                                                id={`certificate-issuedBy-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={certificate.issuedBy}
                                                onChange={(e) => handleArrayItemChange("certificates", index, "issuedBy", e.target.value)}
                                                placeholder="e.g., Amazon Web Services"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`certificate-issueDate-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Issue Date</label>
                                            <input
                                                type="date"
                                                id={`certificate-issueDate-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={certificate.issueDate}
                                                onChange={(e) => handleArrayItemChange("certificates", index, "issueDate", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`certificate-viewLink-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">View Link</label>
                                            <input
                                                type="url"
                                                id={`certificate-viewLink-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={certificate.viewLink}
                                                onChange={(e) => handleArrayItemChange("certificates", index, "viewLink", e.target.value)}
                                                placeholder="https://yourcertificate.com/view"
                                            />
                                        </div>
                                    </div>
                                    {formData.certificates.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveArrayItem("certificates", index)}
                                            className="absolute top-3 right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-150 ease-in-out"
                                            title="Remove certificate"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddArrayItem("certificates")}
                                className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out"
                            >
                                <FaPlus className="mr-2" /> Add Certificate
                            </button>
                        </div>
                    </div>

                    {/* Internship */}
                    <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                            <FaRegBuilding className="mr-3 text-cyan-600" /> Internships
                        </h3>
                        <div className="space-y-6">
                            {formData.internship.map((internship, index) => (
                                <div key={index} className="border border-gray-300 p-5 rounded-lg relative bg-gray-50">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Internship #{index + 1}</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label htmlFor={`internship-companyName-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Company Name</label>
                                            <input
                                                type="text"
                                                id={`internship-companyName-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={internship.companyName}
                                                onChange={(e) => handleArrayItemChange("internship", index, "companyName", e.target.value)}
                                                placeholder="e.g., Tech Solutions Inc."
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`internship-certificate-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Certificate Link</label>
                                            <input
                                                type="url"
                                                id={`internship-certificate-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={internship.certificate}
                                                onChange={(e) => handleArrayItemChange("internship", index, "certificate", e.target.value)}
                                                placeholder="https://yourcertificate.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`internship-startDate-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Start Date</label>
                                            <input
                                                type="date"
                                                id={`internship-startDate-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={internship.startDate}
                                                onChange={(e) => handleArrayItemChange("internship", index, "startDate", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`internship-endDate-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">End Date</label>
                                            <input
                                                type="date"
                                                id={`internship-endDate-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={internship.endDate}
                                                onChange={(e) => handleArrayItemChange("internship", index, "endDate", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {formData.internship.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveArrayItem("internship", index)}
                                            className="absolute top-3 right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-150 ease-in-out"
                                            title="Remove internship"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddArrayItem("internship")}
                                className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out"
                            >
                                <FaPlus className="mr-2" /> Add Internship
                            </button>
                        </div>
                    </div>

                    {/* Clients */}
                    <div className="bg-white p-7 rounded-xl shadow-md border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                            <FaThList className="mr-3 text-gray-600" /> Client Projects
                        </h3>
                        <div className="space-y-6">
                            {formData.client.map((clientItem, index) => (
                                <div key={index} className="border border-gray-300 p-5 rounded-lg relative bg-gray-50">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Client Project #{index + 1}</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label htmlFor={`client-companyName-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Company Name</label>
                                            <input
                                                type="text"
                                                id={`client-companyName-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={clientItem.companyName}
                                                onChange={(e) => handleArrayItemChange("client", index, "companyName", e.target.value)}
                                                placeholder="e.g., Global Corp"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`client-description-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Description</label>
                                            <textarea
                                                id={`client-description-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                rows="2"
                                                value={clientItem.description}
                                                onChange={(e) => handleArrayItemChange("client", index, "description", e.target.value)}
                                                placeholder="Describe the client project"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor={`client-role-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Your Role</label>
                                            <input
                                                type="text"
                                                id={`client-role-${index}`}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                value={clientItem.role}
                                                onChange={(e) => handleArrayItemChange("client", index, "role", e.target.value)}
                                                placeholder="e.g., Lead Developer, Consultant"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`client-amount-${index}`} className="text-sm font-semibold text-gray-700 mb-1 block">Amount Earned (Optional)</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <FaDollarSign className="text-gray-400" />
                                                </span>
                                                <input
                                                    type="number"
                                                    id={`client-amount-${index}`}
                                                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-150 ease-in-out"
                                                    value={clientItem.amount}
                                                    onChange={(e) => handleArrayItemChange("client", index, "amount", e.target.value)}
                                                    placeholder="e.g., 500"
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {formData.client.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveArrayItem("client", index)}
                                            className="absolute top-3 right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-150 ease-in-out"
                                            title="Remove client project"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddArrayItem("client")}
                                className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out"
                            >
                                <FaPlus className="mr-2" /> Add Client Project
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10 p-5 bg-white rounded-xl shadow-md border border-gray-200">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
                        >
                            Save Changes
                        </button>
                        {isAdmin && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
                            >
                                Delete Profile
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => navigate(isAdmin ? "/batches" : "/student-profile")}
                            className="w-full sm:w-auto px-8 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditableStudentProfile;