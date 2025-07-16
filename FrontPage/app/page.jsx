"use client";
import React from "react";
// import { DarkGridHero } from '../Components/DarkGridHero'
import Landing from "./Comp/Landing/page";
import Mission from "./Comp/Mission/page";
import AboutUs from "./Comp/AboutUs/page";
import Profiles from "./Comp/pROFILES/page";
import Navbar from "./Comp/Navbar/page";
import Contact from "./Comp/Contact/page";
import { useEffect } from "react";
import './globals.css';

const Page = () => {

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

  useEffect(() => {
    fetch(`${APP_URL}/api/ping`)
      .then((res) => res.json())
      .then((data) => console.log("Backend awake:", data))
      .catch((err) => console.error("Backend ping failed:", err));
  }, []);

  return (
    <div className="page">
      <Navbar />
      <Landing />
      <Mission />
      <Profiles />
      <AboutUs />
      <Contact />
    </div>
  );
};

export default Page; // Ensure this is a default export
