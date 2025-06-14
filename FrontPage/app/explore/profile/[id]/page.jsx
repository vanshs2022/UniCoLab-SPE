"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import contact from "../../../../public/contact.png";
import userAuthStatus from "../../../../utils/authStatus";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userAuthStatus().then(({ email, authenticated, token }) => {
      if (!authenticated) {
        router.push("/auth/login");
      } else {
        async function fetchProfile() {
          try {
            const res = await fetch(`http://localhost:5000/api/profile/${id}`, {
              headers: { authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Profile not found");
            const data = await res.json();
            setUser(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        }

        if (id) fetchProfile();
      }
    });
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a1030] font-inter">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a1030] font-inter">
        <p className="text-red-500 text-lg">Profile not found</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a1030] px-4 font-inter">
      <div className="bg-[#11183f] border border-[#1f2555] p-10 rounded-2xl shadow-lg max-w-6xl w-full text-white flex flex-col md:flex-row gap-10 transition duration-300">
        {/* LEFT SIDE - IMAGE, NAME, ROLE */}
        <div className="flex flex-col items-center md:w-1/3">
          {/* Profile Image */}
          {user.profilePic && (
            <div className="relative w-48 h-48 rounded-full bg-[#4f56f1] flex items-center justify-center mb-6">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-44 h-44 rounded-full border-4 border-[#0a1030] object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = contact.src;
                }}
              />
            </div>
          )}

          {/* Name */}
          <h1 className="text-4xl font-extrabold mb-2 text-center leading-tight tracking-wide">
            {user.name || "N/A"}
          </h1>

          {/* Role with margin top */}
          <div className="inline-block bg-[#4f56f1] text-white px-5 py-2 rounded-full font-semibold text-base mt-6 mb-6 tracking-wide">
            {user.role || "Role N/A"}
          </div>
        </div>

        {/* RIGHT SIDE - DESCRIPTION, SKILLS, LINKS, CONNECT */}
        <div className="flex flex-col justify-center md:w-2/3 text-center md:text-left">
          {/* Description */}
          <p className="text-gray-300 text-base mb-6 leading-relaxed tracking-normal">
            {user.description || "No description available."}
          </p>

          {/* Skills Section Below Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-white tracking-wide">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {user.skills.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#4f56f1] text-white text-xs rounded-full shadow-md font-medium tracking-wide"
                  >
                    {skill.name}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No skills listed.</p>
              )}
            </div>
          </div>

          {/* Projects Section Below Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-white tracking-wide">
              Projects
            </h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {user.projects?.project1 && (
                <span
                  key="project1"
                  className="px-4 py-2 bg-[#4f56f1] text-white text-xs rounded-full shadow-md font-medium tracking-wide hover:bg-[#122296]"
                >
                  <Link
                    href={user.projects.project1}
                    target="_blank"
                    className="flex items-center gap-2 text-white transition-colors duration-300"
                  >
                    <img
                      src="/projectLogo.png"
                      alt="Project Icon"
                      className="w-6 h-6 object-contain"
                    />
                    Project Alpha
                  </Link>
                </span>
              )}
              {user.projects?.project2 && (
                <span
                  key="project2"
                  className="px-4 py-2 bg-[#4f56f1] text-white text-xs rounded-full shadow-md font-medium tracking-wide hover:bg-[#122296]"
                >
                  <Link
                    href={user.projects.project2}
                    target="_blank"
                    className="flex items-center gap-2 text-white transition-colors duration-300"
                  >
                    <img
                      src="/projectLogo.png"
                      alt="Project Icon"
                      className="w-6 h-6 object-contain"
                    />
                    Project Beta
                  </Link>
                </span>
              )}
            </div>
          </div>

          {/* GitHub Link */}
          {user.githubLink && (
            <div className="mb-6">
              <Link
                href={user.githubLink}
                target="_blank"
                className="inline-block text-blue-400 hover:text-blue-500 transition-colors duration-300 text-base font-medium"
              >
                Check Out My GitHub!
              </Link>
            </div>
          )}

          {/* Resume Link */}
          {user.resume && (
            <div className="mb-6">
              <Link
                href={user.resume}
                target="_blank"
                className="inline-block text-blue-400 hover:text-blue-500 transition-colors duration-300 text-base font-medium"
              >
                Check out my Resume!
              </Link>
            </div>
          )}

          {/* Connect Button */}
          <div className="mt-4">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-block px-8 py-4 bg-[#4f56f1] text-white text-lg font-semibold rounded-lg text-center hover:bg-[#122296] transition tracking-wide"
            >
              Connect
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
