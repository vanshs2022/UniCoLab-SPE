"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

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

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Profile not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile of {user.name || "N/A"}</h1>
      {user.profilePic && (
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full mt-2"
        />
      )}
      <p>
        <strong>Role:</strong> {user.role || "N/A"}
      </p>
    </div>
  );
}
