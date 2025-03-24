"use client";
import React from "react";
import Link from "next/link";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import { MdDeveloperMode } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { CiCloudOn } from "react-icons/ci";
import { FaFigma } from "react-icons/fa";
import { CiDatabase } from "react-icons/ci";
import { BsClipboard2Data } from "react-icons/bs";
import { IoHardwareChip } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";

const HoverDevCards = () => {
  return (
    <div className="p-4">
      <p className="text-xl font-semibold mb-2">Search By Role </p>
      
      <div className="cards-profile grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center">
        <Card title="ALL" subtitle="Explore all the roles again!" href="/explore/profile" Icon={FaRobot} />
        <Card title="Web Developer" subtitle="Crafting seamless digital experiences, one line of code at a time!" href="/explore/profile?role=web+developer" Icon={CgWebsite} />
        <Card title="App Developer" subtitle="Turning ideas into interactive apps that fit right in your pocket!" href="/explore/profile?role=app+developer" Icon={MdDeveloperMode} />
        <Card title="UI/UX Designer" subtitle="Designing intuitive and beautiful interfaces that users love!" href="/explore/profile?role=ui+ux+designer" Icon={FaFigma} />
        <Card title="Cloud Computing" subtitle="Scaling businesses to new heights with the power of the cloud!" href="/explore/profile?role=cloud+computing" Icon={CiCloudOn} />
        <Card title="Database Management" subtitle="Organizing data for efficiency, security, and speed!" href="/explore/profile?role=database+management" Icon={CiDatabase} />
        <Card title="Machine Learning" subtitle="Training machines to think, predict, and innovate!" href="/explore/profile?role=machine+learning" Icon={BsClipboard2Data} />
        <Card title="Hardware System" subtitle="Bridging the gap between software and the real world!" href="/explore/profile?role=hardware+system" Icon={IoHardwareChip } />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <Link
      href={href}
      className="profile-card  p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
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