"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "../../../Comp/Navbar/page";
import Link from "next/link";
import contact from "../../../../public/contact.png";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${APP_URL}/api/profile/${id}`);
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
  }, [id]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1030] font-inter text-white">
        {loading ? "Loading..." : "Profile not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1030] px-6 font-inter">
      <Navbar />
      <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-white border-opacity-10">

        {/* Top Section */}
        <div className="bg-white text-black flex flex-col md:flex-row items-center justify-between p-6 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-blue-500 shadow-md overflow-hidden">
              <img
                src={user.profilePic || contact.src}
                onError={(e) => (e.target.src = contact.src)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">{user.name || "N/A"}</h1>
              <p className="text-sm font-medium text-gray-700">{user.role || "Web Developer"}</p>
            </div>
          </div>
          {/* <a href="/explore/profile/edit">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition">
            Edit Profile
          </button>
          </a> */}
        </div>

        {/* Bottom Section */}
        <div className="bg-white bg-opacity-5 backdrop-blur-lg text-white p-8 flex flex-col gap-8">

          {/* Bio */}
          <div>
            <h3 className="font-semibold mb-2 text-base">Bio</h3>
            <p className="text-gray-300 text-sm">
              {user.description || "Backend Engineer specializing in distributed systems."}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold mb-2 text-base">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {user.skills?.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span key={index} className="text-sm px-4 py-1 bg-indigo-600 rounded-full font-medium">
                    {skill.name}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-400">No skills listed.</p>
              )}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-semibold mb-2 text-base">Projects</h3>
            <div className="flex flex-wrap gap-3">
              {user.projects?.project1 && (
                <Link
                  href={user.projects.project1}
                  target="_blank"
                  className="text-sm px-4 py-2 bg-indigo-600 rounded-full hover:bg-indigo-700 transition font-medium"
                >
                  Project 1
                </Link>
              )}
              {user.projects?.project2 && (
                <Link
                  href={user.projects.project2}
                  target="_blank"
                  className="text-sm px-4 py-2 bg-indigo-600 rounded-full hover:bg-indigo-700 transition font-medium"
                >
                  Project 2
                </Link>
              )}
            </div>
          </div>

          {/* GitHub + Resume */}
          <div className="text-base space-y-2">
            {user.githubLink && (
              <Link href={user.githubLink} target="_blank" className="block text-blue-400 hover:underline">
                GitHub Profile
              </Link>
            )}
            {user.resume && (
              <Link href={user.resume} target="_blank" className="block text-blue-400 hover:underline">
                Resume
              </Link>
            )}
          </div>

          {/* Connect */}
          <div className="text-center">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition text-white font-semibold rounded-xl text-base"
            >
              Connect
            </a>
          </div>
        </div>
      </div>
    </div>

  );
}
