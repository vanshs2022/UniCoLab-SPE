"use client";

import { useState } from "react";

export default function ProfileForm() {
  const initialFormData = {
    name: "",
    username: "",
    profilePic: "",
    description: "",
    skills: [{ name: "" }],
    projects: { project1: "", project2: "" },
    role: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index].name = value;
    setFormData({ ...formData, skills: newSkills });
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
      console.log(result);
      if (result.message === "Message received!") {
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile Form</h2>
      
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
            
      <input type="url" name="profilePic" placeholder="Profile Pic URL" value={formData.profilePic} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 mb-2 border rounded"></textarea>
      
      {/* Skills */}
      <label>Skills:</label>
      {formData.skills.map((skill, index) => (
        <div key={index} className="flex mb-2">
          <input type="text" placeholder="Skill" value={skill.name} onChange={(e) => handleSkillChange(index, e.target.value)} className="w-full p-2 border rounded" required />
        </div>
      ))}
      <button type="button" onClick={() => setFormData({ ...formData, skills: [...formData.skills, { name: "" }] })} className="mb-2 p-2 border rounded bg-blue-500 text-white">Add Skill</button>
      
      {/* Projects */}
      <label>Projects:</label>
      <input type="text" placeholder="Project 1" value={formData.projects.project1} onChange={(e) => handleProjectChange("project1", e.target.value)} className="w-full p-2 mb-2 border rounded" />
      <input type="text" placeholder="Project 2" value={formData.projects.project2} onChange={(e) => handleProjectChange("project2", e.target.value)} className="w-full p-2 mb-2 border rounded" />
      
      <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Submit</button>
    </form>
  );
}