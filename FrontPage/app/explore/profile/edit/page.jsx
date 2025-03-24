"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const router = useRouter();

  const initialFormData = {
    name: "",
    username: "",
    profilePic: "",
    description: "",
    githubLink: "",
    skills: [],
    projects: { project1: "", project2: "" },
    role: "",
    resume: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [skillInput, setSkillInput] = useState("");
  const [formKey, setFormKey] = useState(0); // Key to force rerender

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() !== "" && !formData.skills.includes(skillInput)) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput] });
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skillName) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillName),
    });
  };

  const handleProjectChange = (key, value) => {
    setFormData({ ...formData, projects: { ...formData.projects, [key]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/profile/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log("Response from backend:", result);
  
      if (result.message === "Message recieved!" && result.profileId) {
        router.push(`/explore/profile/${result.profileId}`);
        
        setFormData(initialFormData);
        setSkillInput("");
        setFormKey((prevKey) => prevKey + 1);
      } else {
        console.error("Profile ID not returned from backend");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
      <form
        key={formKey}
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-black bg-opacity-80 p-6 rounded-2xl shadow-xl border border-blue-500 transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">
          Create Your Profile
        </h2>

        {/* Profile Pic */}
        <div className="flex flex-col items-center mb-4">
          {formData.profilePic && (
            <img
              src={formData.profilePic}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full shadow-md border-2 border-blue-500 mb-2"
            />
          )}
          <input
            type="url"
            name="profilePic"
            placeholder="Profile Pic URL"
            value={formData.profilePic}
            onChange={handleChange}
            className="w-full p-2 border border-blue-500 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-3 border border-blue-500 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        {/* GitHub URL */}
        <input
          type="url"
          name="githubLink"
          placeholder="GitHub URL"
          value={formData.githubLink}
          onChange={handleChange}
          className="w-full p-3 mb-3 border border-blue-500 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Tell us about yourself..."
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 mb-3 border border-blue-500 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>

        {/* Skills */}
        <label className="block text-blue-400 font-semibold mb-2">Skills:</label>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            placeholder="Add a skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            className="w-full p-2 border border-blue-500 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="button"
            onClick={handleSkillAdd}
            className="p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add
          </button>
        </div>

        {/* Display Added Skills as Bubbles */}
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleSkillRemove(skill)}
                className="text-black bg-white rounded-full px-2 py-0.5 text-xs hover:bg-red-500 hover:text-white transition duration-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Projects */}
        <label className="block text-blue-400 font-semibold mb-2">Projects:</label>
        <input
          type="text"
          placeholder="Project 1"
          value={formData.projects.project1}
          onChange={(e) => handleProjectChange("project1", e.target.value)}
          className="w-full p-2 mb-2 border border-blue-500 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          placeholder="Project 2"
          value={formData.projects.project2}
          onChange={(e) => handleProjectChange("project2", e.target.value)}
          className="w-full p-2 mb-3 border border-blue-500 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Role */}
        <input
          type="text"
          name="role"
          placeholder="Role (e.g., Developer, Designer)"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-blue-500 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Resume URL */}
        <div className="flex flex-col items-center mb-4">
          <input
            type="url"
            name="resume"
            placeholder="Resume URL"
            value={formData.resume}
            onChange={handleChange}
            className="w-full p-2 border border-blue-500 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Profile
        </button>
      </form>
    </div>
  );
}
