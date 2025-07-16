"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiAtlassian,
  SiDribbble,
  SiGrubhub,
  SiKaggle,
  SiSlack,
  SiNike,
} from "react-icons/si";

const StackedCardTestimonials = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="stackedcard bg-white py-24 px-4 lg:px-8 grid items-center grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 overflow-hidden">
      <div className=" p-4">
        <h3 className="miss-title text-5xl font-semibold ">Our Mission</h3>
        <p className="miss-para text-black my-4" style={{fontSize:"1.5vw"}}>
        At UniColab, our mission is to bridge the gap between talent and opportunities by creating a seamless platform where students can connect, collaborate, and grow together. We aim to empower individuals by making it easier to find the right teammates for projects, hackathons, and internships. By fostering a strong, skill-driven community, we strive to unlock the full potential of every student and help them achieve their goals.

        </p>
        <SelectBtns
          numTracks={testimonials.length}
          setSelected={setSelected}
          selected={selected}
        />
      </div>
      <Cards
        testimonials={testimonials}
        setSelected={setSelected}
        selected={selected}
      />
    </section>
  );
};

const SelectBtns = ({ numTracks, setSelected, selected }) => (
  <div className="flex gap-1 mt-8">
    {Array.from({ length: numTracks }).map((_, n) => (
      <button
        key={n}
        onClick={() => setSelected(n)}
        className="button h-1.5 w-full bg-slate-300 relative"
      >
        {selected === n ? (
          <motion.span
            className="select absolute top-0 left-0 bottom-0 bg-slate-950"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5 }}
            onAnimationComplete={() =>
              setSelected((prev) => (prev === numTracks - 1 ? 0 : prev + 1))
            }
          />
        ) : (
          <span
            className="absolute top-0 left-0 bottom-0 bg-slate-950"
            style={{ width: selected > n ? "100%" : "0%" }}
          />
        )}
      </button>
    ))}
  </div>
);

const Cards = ({ testimonials, selected, setSelected }) => (
  <div className="p-4 relative h-[450px] lg:h-[500px] shadow-xl">
    {testimonials.map((t, i) => (
      <Card
        {...t}
        key={i}
        position={i}
        selected={selected}
        setSelected={setSelected}
      />
    ))}
  </div>
);

const Card = ({
  Icon,
  description,
  name,
  title,
  position,
  selected,
  setSelected,
}) => {
  const scale = position <= selected ? 1 : 1 + 0.015 * (position - selected);
  const offset = position <= selected ? 0 : 95 + (position - selected) * 3;
  const background = position % 2 ? "white" : "black";
  const color = position % 2 ? "black" : "white";

  return (
    <motion.div
      initial={false}
      style={{
        zIndex: position,
        transformOrigin: "left bottom",
        background,
        color,
      }}
      animate={{
        x: `${offset}%`,
        scale,
      }}
      whileHover={{
        translateX: position === selected ? 0 : -3,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      onClick={() => setSelected(position)}
      className="absolute top-0 left-0 w-full min-h-full p-8 lg:p-12 cursor-pointer flex flex-col justify-between"
    >
      <h1 >{Icon}</h1>
      <p className="text-lg lg:text-xl font-light italic my-8">
        "{description}"
      </p>
      <div>
        <span className="block font-semibold text-lg">{name}</span>
        <span className="block text-sm">{title}</span>
      </div>
    </motion.div>
  );
};

export default StackedCardTestimonials;

const testimonials = [
  {
    Icon: "CREATE",
    description: "UniColab provides a space for students to showcase their skills, experiences, and projects. Whether you're a developer, designer, or strategist, your profile will highlight your strengths and increase your visibility to potential teammates and recruiters."
  },
  {
    Icon: "COLLAB",
    description: "Finding the right team has never been easier. With UniColab, students can connect with like-minded peers, form strong teams for hackathons or projects, and work on ideas that can turn into reality. The platform ensures efficient matchmaking based on skills and interests, streamlining the process of team formation."
  },{
    Icon: "CONQUER",
    description: "Beyond finding teams, UniColab encourages knowledge sharing and networking. By engaging with the community, offering mentorship, and contributing to projects, students can enhance their expertise and support others. We believe that great ideas thrive in collaborative environments, and UniColab is here to nurture that spirit.",
  },
  // Additional testimonials...
];