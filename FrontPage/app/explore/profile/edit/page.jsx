"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import userAuthStatus from "@/utils/authStatus";

export default function ProfileForm() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [token, setToken] = useState("");
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

  let initialFormData = {
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

  useEffect(() => {
    userAuthStatus().then(({ email, authenticated, token }) => {
      if (!authenticated) {
        router.push("/auth/login");
      } else {
        setToken(token);
        setIsLoggedIn(true);
        const fetchProfile = async () => {
          try {
            const response = await fetch(`${APP_URL}/api/profile/get`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ email }),
            });

            const profile = await response.json();
            if (profile.message !== "No user Found") {
              setFormData(profile.profile);
            } else {
              setFormData((prev) => ({ ...prev, username: email }));
            }
          } catch (error) {
            console.error("Error in fetching user data." + error);
          }
        };
        fetchProfile();
      }
    });
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillAdd = () => {
    const newSkill = skillInput.trim();
    if (newSkill !== "" && !formData.skills.includes(newSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
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
    setFormData({
      ...formData,
      projects: { ...formData.projects, [key]: value },
    });
  };

  const handleImageUpload = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch(`${APP_URL}/api/upload`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.imageUrl) {
        setFormData((prev) => ({ ...prev, profilePic: data.imageUrl }));
      } else {
        console.error("Upload failed: No imageUrl in response.");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleImageUpload,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalFormData = {
      ...formData,
      profilePic:
        formData?.profilePic?.trim() !== ""
          ? formData.profilePic
          : "https://res.cloudinary.com/drgjychlv/image/upload/v1752843980/contact_y0kgfu.png",
    };

    try {
      const response = await fetch(`${APP_URL}/api/profile/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalFormData),
      });

      const result = await response.json();

      if (result.message === "No user found") {
        alert("Signup required");
        router.push("/auth/signup");
      }

      if (
        (result.message === "Message Recieved!" ||
          result.message === "Updated") &&
        result.profileId
      ) {
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

  if (isLoggedIn === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0A1133]">
        <p className="text-white text-xl">Checking authentication status...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0A1133] p-6">
      <form
        key={formKey}
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#0A1133] bg-opacity-90 p-6 rounded-2xl shadow-2xl border border-[#1A237E] transform transition duration-500 hover:bg-[#020324]"
      >
        <h2 className="text-3xl font-bold text-center text-[#ffffff] mb-6">
          Create Your Profile
        </h2>

        {/* Profile Image Preview */}
        <div className="flex flex-col items-center mb-4">
          {formData?.profilePic && (
            <img
              src={formData.profilePic}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full shadow-md border-2 border-[#ffffff] mb-2 object-cover"
            />
          )}

          {/* Drag & Drop Upload */}
          <div
            {...getRootProps()}
            className={`w-full h-20 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-300 mb-2 ${
              isDragActive
                ? "border-white bg-[#1A237E]"
                : "border-gray-400 bg-[#151c66]"
            }`}
          >
            <input {...getInputProps()} />
            <p className="text-sm text-center">
              {isDragActive
                ? "Drop the image here..."
                : "Drag & drop or click to upload profile picture"}
            </p>
          </div>
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData?.name || ""}
          onChange={handleChange}
          className="w-full p-3 mb-3 border border-[#1A237E] rounded-lg bg-[#0A1133] text-white"
          required
        />

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Email"
          value={formData?.username || ""}
          onChange={handleChange}
          className="w-full p-3 mb-3 border border-[#1A237E] rounded-lg bg-[#0A1133] text-white"
          required
        />

        {/* GitHub */}
        <input
          type="url"
          name="githubLink"
          placeholder="GitHub URL"
          value={formData?.githubLink || ""}
          onChange={handleChange}
          className="w-full p-3 mb-3 border border-[#1A237E] rounded-lg bg-[#0A1133] text-white"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Tell us about yourself..."
          value={formData?.description || ""}
          onChange={handleChange}
          className="w-full p-3 mb-3 border border-[#1A237E] rounded-lg bg-[#0A1133] text-white"
        ></textarea>

        {/* Skills */}
        <label className="block text-[#ffffff] font-semibold mb-2">
          Skills
        </label>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            placeholder="Add a skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            className="w-full p-2 border border-[#1A237E] rounded-lg bg-[#0A1133] text-white"
          />
          <button
            type="button"
            onClick={handleSkillAdd}
            className="p-2 bg-white text-[#0A1133] font-semibold rounded-lg"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {Array.isArray(formData?.skills) &&
            formData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-white text-[#0A1133] px-3 py-1 rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleSkillRemove(skill)}
                  className="text-white bg-[#1A237E] rounded-full px-2 py-0.5 text-xs hover:bg-red-600 hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
        </div>

        {/* Projects */}
        <label className="block text-[#ffffff] font-semibold mb-2">
          Projects
        </label>
        <input
          type="text"
          placeholder="Project 1"
          value={formData?.projects?.project1 || ""}
          onChange={(e) => handleProjectChange("project1", e.target.value)}
          className="w-full p-2 mb-2 border border-[#1A237E] rounded-lg bg-[#0A1133] text-white"
        />
        <input
          type="text"
          placeholder="Project 2"
          value={formData?.projects?.project2 || ""}
          onChange={(e) => handleProjectChange("project2", e.target.value)}
          className="w-full p-2 mb-3 border border-[#1A237E] rounded-lg bg-[#0A1133] text-white"
        />

        {/* Role */}
        <label className="block text-[#ffffff] font-semibold mb-2">Role</label>
        <select
          name="role"
          value={formData?.role}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-[#1A237E] rounded-lg bg-[#0A1133] text-white"
          required
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="Web Developer">Web Developer</option>
          <option value="App Developer">App Developer</option>
          <option value="UI UX Designer">UI UX Designer</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Database Management">Database Management</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Hardware System">Hardware System</option>
        </select>

        {/* Resume */}
        <input
          type="url"
          name="resume"
          placeholder="Resume URL"
          value={formData?.resume || ""}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-[#1A237E] rounded-lg bg-[#0A1133] text-white"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-3 bg-white text-[#0A1133] font-bold rounded-lg shadow-lg"
        >
          Submit Profile
        </button>
      </form>
    </div>
  );
}
