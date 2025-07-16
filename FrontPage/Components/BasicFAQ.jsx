"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

const BasicFAQ = () => {
  return (
    <div id="doubt" className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h3 className="mb-4 text-center text-3xl font-semibold">
          Your Doubt Might Be Here !!!
        </h3>
        <Question title="Do I need to log in to search for talent?" defaultOpen>
          <p>
          No, anyone can browse profiles without logging in. However, if you want to connect with someone, you must sign in. This ensures a secure and trusted community.

          </p>
        </Question>
        <Question title="Is this platform free to use?">
          <p>
          Yes, UniCoLab is completely free for talent and seekers. Our goal is to make collaboration and networking easier without any barriers.
          </p>
        </Question>
        <Question title="How is UniCoLab different from LinkedIn or other job platforms?">
          <p>
          Unlike generic job platforms, it focuses on hackathon collaborations, project partnerships, and direct internship connections between talent and seeker.
          </p>
        </Question>
        <Question title="Can I find internship opportunities on this platform?">
          <p>
          Yes! Startup founders and incubators looking for interns can browse profiles and reach out directly to potential interns. However, students cannot apply for internships through the platform—only recruiters can initiate contact.
          </p>
        </Question>
      </div>
    </div>
  );
};

const Question = ({ title, children, defaultOpen = false }) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="border-b-[1px] border-b-slate-300"
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-6"
      >
        <motion.span
          variants={{
            open: {
              color: "rgba(3, 6, 23, 0)",
            },
            closed: {
              color: "rgba(3, 6, 23, 1)",
            },
          }}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-left text-lg font-medium"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: {
              rotate: "180deg",
              color: "rgb(124 58 237)",
            },
            closed: {
              rotate: "0deg",
              color: "#030617",
            },
          }}
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-600"
      >
        <div ref={ref}>{children}</div>   
      </motion.div>
    </motion.div>
  );
};

export default BasicFAQ;