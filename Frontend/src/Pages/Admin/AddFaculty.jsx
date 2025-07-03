import React, { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const AddFaculty = () => {
  const navigate = useNavigate();

  const [facultyData, setFacultyData] = useState({
    name: "",
    title: "",
    department: "",
    experience: "",
    descrip: "",
    linkedin: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFacultyData({ ...facultyData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setMessage("Please upload a faculty image.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      Object.entries(facultyData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("image", imageFile);

      const res = await axios.post(`${BACKEND_URL}/faculty`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Faculty added successfully!");
      setTimeout(() => {
        navigate("/facultyList");
      }, 1500);
    } catch (err) {
      console.error("Error adding faculty:", err);
      setMessage(err.response?.data?.message || "Error adding faculty.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#002244] mb-6">Add New Faculty</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={facultyData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="text"
            name="title"
            value={facultyData.title}
            onChange={handleChange}
            placeholder="Title (e.g., Assistant Professor)"
            required
            className="w-full border px-4 py-2 rounded"
          />

          <select
            name="department"
            value={facultyData.department}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Biology">Biology</option>
            <option value="Humanities">Humanities</option>
          </select>

          <input
            type="number"
            name="experience"
            value={facultyData.experience}
            onChange={handleChange}
            placeholder="Years of Experience"
            required
            className="w-full border px-4 py-2 rounded"
          />

          <textarea
            name="descrip"
            value={facultyData.descrip}
            onChange={handleChange}
            placeholder="Short Description"
            required
            className="w-full border px-4 py-2 rounded h-24"
          />

          <input
            type="url"
            name="linkedin"
            value={facultyData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          {message && (
            <p className="text-sm text-center text-red-600">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#002277] text-white px-6 py-2 rounded hover:bg-[#001a5c] transition w-full"
          >
            {loading ? "Uploading..." : "Add Faculty"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFaculty;
