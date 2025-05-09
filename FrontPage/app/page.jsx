"use client";
import React from "react";
// import { DarkGridHero } from '../Components/DarkGridHero'
import Landing from "./Comp/Landing/page";
import Mission from "./Comp/Mission/page";
import  AboutUs from "./Comp/AboutUs/page";
import Profiles from "./Comp/pROFILES/page";
import Navbar from "./Comp/Navbar/page";
import Contact from "./Comp/Contact/page";

const Page = () => {
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