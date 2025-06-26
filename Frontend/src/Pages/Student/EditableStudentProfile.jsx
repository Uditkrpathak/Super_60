import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentEditContext from "../../context/StudentEditContext";
import BACKEND_URL from "../../utils/axiosConfig";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const EditableStudentProfile = () => {
    const { studentProfile, setStudentProfile } = useContext(StudentEditContext);

    const {isAdmin} = useContext(AuthContext);


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        branch: "",
        batch: "",
        achievements: "",
        projects: "",
        skills: [],
        image: "",
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!studentProfile) {
            navigate('/batches');
            return ;
        }

        setFormData({
            name: studentProfile.name || "",
            email: studentProfile.email || "",
            branch: studentProfile.branch || "",
            batch: studentProfile.batch || "",
            achievements: studentProfile.achievements || "",
            projects: studentProfile.projects || "",
            skills: studentProfile.skills || [],
            image: studentProfile.image || "",
        });
    }, [studentProfile, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "skills") {
            const skillsArray = value.split(",").map((skill) => skill.trim());
            setFormData((prev) => ({ ...prev, skills: skillsArray }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `${BACKEND_URL}/student/${studentProfile._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log( res.data);
            setStudentProfile(res.data);
            navigate(isAdmin?"/batches":"/student-profile");
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
            console.log(res.data);
            navigate("/batches");
        } catch (error) {
            console.error("Delete failed:", error?.response?.data?.message || error.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Student Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Inputs */}
                {["name", "email", "branch", "batch", "achievements", "projects", "image"].map((field) => (
                    <div key={field}>
                        <label className="block text-sm text-gray-700 capitalize">{field}</label>
                        <input
                            type={["achievements", "projects"].includes(field) ? "number" : "text"}
                            name={field}
                            className="w-full border px-3 py-2 rounded"
                            value={formData[field]}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                {/* Skills */}
                <div>
                    <label className="block text-sm text-gray-700">
                        Skills (comma-separated)
                    </label>
                    <input
                        type="text"
                        name="skills"
                        className="w-full border px-3 py-2 rounded"
                        value={formData.skills.join(", ")}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit & Delete */}
                <div className="flex items-center justify-between pt-4">
                            <button
                                type="submit"
                                className="bg-[#002277] text-white px-4 py-2 rounded-md"
                            >
                                Save Changes
                            </button>
                            {isAdmin && (
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
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