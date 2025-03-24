"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 
import SquishyCard from "../../../Components/SquishyCard";
import Navbar from "../../Comp/Navbar/page";
import { DrawCircleText } from "../../../Components/DrawCircleText";
import HoverDevCards from "../../../Components/HoverDevCards";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
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
    return <p className="text-white text-center text-lg">Loading...</p>;
  }

  if (!profiles.length) {
    return <p className="text-white text-center text-lg">No profiles available</p>;
  }

  return (
    <div className="xplore bg-[#020825]">
    <Navbar />
    {/* <h1 className="text-white text-center text-2xl mt-6">Explore Profiles</h1> */}
    <HoverDevCards />
    <div className="profiles grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {profiles.map((profile, index) => (
        <Link key={index} href={`/explore/profile/${profile._id}`} passHref>
          {/* <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4"> */}
            {/* <SquishyCard data = {profile} /> */}
            <SquishyCard profile={profile} />
          {/* </div> */}
        </Link>
      ))}
    </div>
    </div>
  );
}
