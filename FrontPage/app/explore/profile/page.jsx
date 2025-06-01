"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 
import { useSearchParams } from "next/navigation";
import SquishyCard from "../../../Components/SquishyCard";
import Navbar from "../../Comp/Navbar/page";
import HoverDevCards from "../../../Components/HoverDevCards";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchProfiles() {
      try {
        setLoading(true);
        const queryString = searchParams.toString();
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
  }, [searchParams]);

  if (loading) {
    return <p className="text-white text-center text-lg">Loading...</p>;
  }

  if (!profiles.length) {
    return <p className="text-white text-center text-lg">No profiles available</p>;
  }

  return (
    <div className="explore bg-[#020825]">
      <Navbar />
      <HoverDevCards />
      <div className="profiles grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {profiles.map((profile) => (
          <Link key={profile._id} href={`/explore/profile/${profile._id}`} passHref>
            <SquishyCard profile={profile} />
          </Link>
        ))}
      </div>
    </div>
  );
}
