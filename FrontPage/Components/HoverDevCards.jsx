"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import { MdDeveloperMode } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { CiCloudOn } from "react-icons/ci";
import { FaFigma } from "react-icons/fa";
import { CiDatabase } from "react-icons/ci";
import { BsClipboard2Data } from "react-icons/bs";
import { IoHardwareChip } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";

const roles = [
  { title: "ALL", value: "", icon: FaRobot },
  { title: "Web Developer", value: "web+developer", icon: CgWebsite },
  { title: "App Developer", value: "app+developer", icon: MdDeveloperMode },
  { title: "UI/UX Designer", value: "ui+ux+designer", icon: FaFigma },
  { title: "Cloud Computing", value: "cloud+computing", icon: CiCloudOn },
  {
    title: "Database Management",
    value: "database+management",
    icon: CiDatabase,
  },
  {
    title: "Machine Learning",
    value: "machine+learning",
    icon: BsClipboard2Data,
  },
  { title: "Hardware System", value: "hardware+system", icon: IoHardwareChip },
];

const HoverDevCards = () => {
  const router = useRouter();

  const handleRoleChange = (e) => {
    const value = e.target.value;
    if (value === "") router.push("/explore/profile");
    else router.push(`/explore/profile?role=${value}`);
  };

  return (
    <div className="p-4">
      <p className="text-xl font-semibold mb-2">Search By Role</p>

      {/* 📱 Mobile Dropdown */}
      <div className="md:hidden mb-4">
        <select
          onChange={handleRoleChange}
          className="w-full p-3 rounded border border-white bg-black text-white text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
          defaultValue=""
        >
          <option value="" disabled>
            Select a role...
          </option>
          {roles.map((role, index) => (
            <option key={index} value={role.value}>
              {role.title}
            </option>
          ))}
        </select>
      </div>

      {/* 💻 Desktop Hover Cards */}
      <div className="hidden md:grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center">
        {roles.map((role, index) => (
          <Card
            key={index}
            title={role.title}
            subtitle={getSubtitle(role.title)}
            href={
              role.value === ""
                ? "/explore/profile"
                : `/explore/profile?role=${role.value}`
            }
            Icon={role.icon}
          />
        ))}
      </div>
    </div>
  );
};

const getSubtitle = (title) => {
  switch (title) {
    case "ALL":
      return "Explore all the roles again!";
    case "Web Developer":
      return "Crafting seamless digital experiences, one line of code at a time!";
    case "App Developer":
      return "Turning ideas into interactive apps that fit right in your pocket!";
    case "UI/UX Designer":
      return "Designing intuitive and beautiful interfaces that users love!";
    case "Cloud Computing":
      return "Scaling businesses to new heights with the power of the cloud!";
    case "Database Management":
      return "Organizing data for efficiency, security, and speed!";
    case "Machine Learning":
      return "Training machines to think, predict, and innovate!";
    case "Hardware System":
      return "Bridging the gap between software and the real world!";
    default:
      return "";
  }
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <Link
      href={href}
      className="profile-card p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </Link>
  );
};

export default HoverDevCards;
