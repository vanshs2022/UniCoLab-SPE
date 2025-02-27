"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles(filters) {
      try {
        const params = new URLSearchParams(window.location.search);
        
        const filters = Object.fromEntries(params.entries());

        console.log("Extracted Filters:", filters);

        const queryString = new URLSearchParams(filters).toString();
        const apiUrl = `http://localhost:5000/api/profile?${queryString}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error("Error receiving data: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profiles.length) {
    return <p>No profiles available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {profiles.map((profile, index) => (
        <Link key={index} href={`/explore/profile/${profile._id}`} passHref>
          <div className="p-4 border rounded-lg shadow-md w-96 cursor-pointer hover:bg-gray-100">
            <h2 className="text-xl font-bold mb-2">{profile.name || "N/A"}</h2>
            {profile.profilePic && (
              <img
                src={profile.profilePic}
                alt="Profile"
                className="w-20 h-20 rounded-full mt-2"
              />
            )}
            <p>
              <strong>Role:</strong> {profile.role || "N/A"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
