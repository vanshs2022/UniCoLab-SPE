"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`http://localhost:5000/api/profile/${id}`);
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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!user) return <p className="text-center text-red-500">Profile not found</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">{user.name || "N/A"}</h1>
        {user.profilePic && (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-2 border-blue-500"
          />
        )}
        <p className="text-gray-400 mt-2">{user.role || "N/A"}</p>
        <p className="mt-4 text-gray-300">{user.description || "No description available."}</p>

        {/* GitHub Link */}
        {user.githubLink && (
          <div className="mt-4">
            <Link
              href={user.githubLink}
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              GitHub Profile
            </Link>
          </div>
        )}

        {/* Skills */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full"
                >
                  {skill.name}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No skills listed.</p>
            )}
          </div>
        </div>

        {/* Projects */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Projects</h3>
          <ul className="list-disc list-inside text-blue-400">
            {user.projects.project1 && (
              <li>
                <Link href={user.projects.project1} target="_blank" className="hover:underline">
                  Project 1
                </Link>
              </li>
            )}
            {user.projects.project2 && (
              <li>
                <Link href={user.projects.project2} target="_blank" className="hover:underline">
                  Project 2
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Connect Button */}
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-center"
        >
          Connect
        </a>
      </div>
    </div>
  );
}