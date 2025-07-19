"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
    <div className="min-h-screen flex items-center justify-center bg-[#0a1030] px-6 py-14 font-inter">
  <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.1)] p-12 w-full max-w-4xl mx-auto text-white border border-white border-opacity-10 flex flex-col md:flex-row gap-10 items-center justify-center">
    
    {/* Left - Image + Name + Role */}
    <div className="flex flex-col items-center text-center space-y-4 md:w-1/3">
      <div className="w-52 h-52 rounded-full border-4 border-blue-500 shadow-blue-500 shadow-md p-1">
        <img
          src={user.profilePic || contact.src}
          onError={(e) => (e.target.src = contact.src)}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <h1 className="text-2xl font-bold mt-4">{user.name || "N/A"}</h1>
      <p className="bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold px-6 py-2 inline-block rounded-full">
        {user.role || "Web Developer"}
      </p>
    </div>

    {/* Right - Info */}
    <div className="flex-1 w-full text-center md:text-left md:w-2/3">
      <p className="text-gray-300 text-lg mb-6">
        {user.description || "Backend Engineer specializing in distributed systems."}
      </p>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-base">Skills</h3>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {user.skills?.length > 0 ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="text-sm px-4 py-2 bg-indigo-600 rounded-full font-medium"
              >
                {skill.name}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-400">No skills listed.</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-base">Projects</h3>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {user.projects?.project1 && (
            <Link
              href={user.projects.project1}
              target="_blank"
              className="text-sm px-4 py-2 bg-indigo-600 rounded-full font-medium hover:bg-indigo-700 transition"
            >
              Project Alpha
            </Link>
          )}
          {user.projects?.project2 && (
            <Link
              href={user.projects.project2}
              target="_blank"
              className="text-sm px-4 py-2 bg-indigo-600 rounded-full font-medium hover:bg-indigo-700 transition"
            >
              Project Beta
            </Link>
          )}
        </div>
      </div>

      <div className="text-base text-blue-400 space-y-2 mb-6">
        {user.githubLink && (
          <Link href={user.githubLink} target="_blank" className="block hover:underline">
            GitHub Profile
          </Link>
        )}
        {user.resume && (
          <Link href={user.resume} target="_blank" className="block hover:underline">
            Resume
          </Link>
        )}
      </div>

      <div className="text-center md:text-left">
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition text-white font-semibold text-base"
        >
          Connect
        </a>
      </div>
    </div>
  </div>
</div>

  );
}
