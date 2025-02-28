"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ContactForm = () => {
  const [selected, setSelected] = useState("individual");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("response recieved");
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatus("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="contact p-4 bg-[#ededed]">
      <div className="w-full max-w-6xl mx-auto shadow-lg flex flex-col-reverse lg:flex-row rounded-lg overflow-hidden">
        <Form
          selected={selected}
          setSelected={setSelected}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          status={status}
        />
        <Images selected={selected} />
      </div>
    </section>
  );
};

const Form = ({ selected, setSelected, formData, handleChange, handleSubmit, status }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`p-8 w-full text-white transition-colors duration-[750ms] ${
        selected === "company" ? "bg-neutral-600" : ""
      }`}
      style={{ backgroundColor: selected !== "company" ? "rgb(8, 26, 145)" : "bg-neutral-500" }}
    >
      <h3 className="text-4xl font-bold mb-6">Contact us</h3>
      
      {/* Name input */}
      <div className="mb-6">
        <p className="text-2xl mb-2">Hi 👋! My name is...</p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name..."
          className="contact_button bg-neutral-700 transition-colors duration-[750ms] placeholder-black/70 p-2 rounded-md w-full focus:outline-0"
          required
        />
      </div>

      {/* Email input */}
      <div className="mb-6">
        <p className="text-2xl mb-2">And my Email is...</p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email..."
          className="contact_button bg-neutral-700 transition-colors duration-[750ms] placeholder-black/70 p-2 rounded-md w-full focus:outline-0"
          required
        />
      </div>

      {/* Message input */}
      <div className="mb-6">
        <p className="text-2xl mb-2">I'd love to ask about...</p>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Whatever your heart desires :)"
          className="contact_button bg-neutral-700 transition-colors duration-[750ms] min-h-[150px] resize-none placeholder-black/70 p-2 rounded-md w-full focus:outline-0"
          required
        />
      </div>

      {/* Submit button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        className="contact_button text-neutral-100 transition-colors duration-[750ms] text-lg text-center rounded-lg w-full py-3 font-semibold"
      >
        Submit
      </motion.button>
      
      {status && <p className="mt-4 text-center">{status}</p>}
    </form>
  );
};

const Images = ({ selected }) => {
  return (
    <div className="bg-white relative overflow-hidden w-full min-h-[100px]">
      <motion.div
        initial={false}
        animate={{ x: selected === "individual" ? "0%" : "100%" }}
        transition={BASE_TRANSITION}
        className="absolute inset-0 bg-slate-200"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <motion.div
        initial={false}
        animate={{ x: selected === "company" ? "0%" : "-100%" }}
        transition={BASE_TRANSITION}
        className="absolute inset-0 bg-slate-200"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default ContactForm;

const BASE_TRANSITION = { ease: "anticipate", duration: 0.75 };