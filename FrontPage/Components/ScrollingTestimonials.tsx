import { motion } from "framer-motion";

const ScrollingTestimonials = () => {
  return (
    <div className="bg-slate-950 py-12">
      <div className="mb-8 px-4">
        <h3 className="text-slate-50 text-4xl font-semibold text-center">
          Peoples Openion About US
        </h3>
        <p className="text-center text-slate-300 text-sm mt-2 max-w-lg mx-auto">
          The priorties the the reviews of users more than the database as they help to grow and improve the team.
        </p>
      </div>
      <div className="p-4 overflow-x-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-900 to-transparent" />

        <div className="flex items-center mb-4">
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
        </div>
        <div className="flex items-center mb-4">
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
        </div>
        <div className="flex items-center">
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
        </div>

        <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-900 to-transparent" />
      </div>
    </div>
  );
};

const TestimonialList = ({ list , reverse = false, duration = 50 }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {list.map((t) => {
        return (
          <div
            key={t.id}
            className="shrink-0 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative"
          >
            <img src={t.img} className="w-full h-44 object-cover" />
            <div className="bg-slate-900 text-slate-50 p-4">
              <span className="block font-semibold text-lg mb-1">{t.name}</span>
              <span className="block mb-3 text-sm font-medium">{t.title}</span>
              <span className="block text-sm text-slate-300">{t.info}</span>
            </div>
            <span className="text-7xl absolute top-2 right-2 text-slate-700">
              "
            </span>
          </div>
        );
      })}
    </motion.div>
  );
};

const testimonials = {
  top: [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=703&q=80",
      name: "Priya Mehta",
      title: "Full-Stack Developer",
      info: "UniColab made finding teammates effortless! I connected with skilled peers in minutes instead of searching through endless groups",
    },
    {
      id: 2,
      img: "https://plus.unsplash.com/premium_photo-1691030256264-59cdf9414ed1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZSUyMGluZGlhbnxlbnwwfHwwfHx8MA%3D%3D",
      name: "Aryan Sharma",
      title: "UI/UX Designer",
      info: "UniColab helped me find the perfect developer for my project in minutes! No more endless searching—just quick, meaningful connections",
    },
    {
      id: 3,
      img: "https://media.istockphoto.com/id/1315976553/photo/portrait-of-a-smiling-man-of-indian-origin.webp?a=1&b=1&s=612x612&w=0&k=20&c=q3XnkehXZShGGerEGnuMNkZtennMr7Jb5d67evwJDg4=",
      name: "Rohan Verma",
      title: "Data Scientist",
      info: "I found a fantastic hackathon team through UniColab! The skill-based matching is amazing—collaboration has never been this easy.",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
      name: "Ananya Singh",
      title: "Content Writer",
      info: "Connecting with developers and designers for projects was tough before UniColab. Now, I easily find talented people to collaborate with!",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      name: "Kunal Joshi",
      title: "Cybersecurity Enthusiast",
      info: "UniColab is a game-changer! I found a passionate team for my research project within minutes—highly recommend for all students!",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      name: "Neha Kapoor",
      title: "Software Engineer",
      info: "Finally, a platform that makes team-building easy! UniColab connected me with skilled peers, saving me hours of searching",
    },
  ],
  middle: [
    {
      id: 1,
      img: "https://media.istockphoto.com/id/664565694/photo/portrait-of-a-young-man.webp?a=1&b=1&s=612x612&w=0&k=20&c=4OoYE3riSjY4tcCmAc_rb_nlapI8hyjLKkQv_gz-hcc=",
      name: "Arjun Malhotra",
      title: "AI/ML Developer",
      info: "Thanks to UniColab, I joined an AI project with brilliant minds. It’s the easiest way to find the right teammates!",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      name: "Meera Nair",
      title: "Marketing Strategist",
      info: "UniColab streamlined finding collaborators for student startups. Connecting with skilled people is now effortless—perfect for aspiring entrepreneurs!",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1534339480783-6816b68be29c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2UlMjBpbmRpYW58ZW58MHx8MHx8fDA%3D",
      name: "Sahil Roy",
      title: "Founder of XYZ",
      info: "Finding blockchain enthusiasts for my project was difficult before UniColab. Now, I instantly connect with passionate and talented people!",
    },  
    //  ----------------    repeated -------------------------
     {
      id: 4, 
      img: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=703&q=80",
      name: "Priya Mehta",
      title: "Full-Stack Developer",
      info: "UniColab made finding teammates effortless! I connected with skilled peers in minutes instead of searching through endless groups",
    },
    {
      id: 5,
      img: 
      "https://plus.unsplash.com/premium_photo-1691030256264-59cdf9414ed1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZSUyMGluZGlhbnxlbnwwfHwwfHx8MA%3D%3D",
      name: "Aryan Sharma",
      title: "UI/UX Designer",
      info: "UniColab helped me find the perfect developer for my project in minutes! No more endless searching—just quick, meaningful connections",
    },
    {
      id: 6,
      img: "https://media.istockphoto.com/id/1277971635/photo/portrait-of-a-smiling-man-of-indian-ethnicity.webp?a=1&b=1&s=612x612&w=0&k=20&c=WDut88fKkZMl0aqIC7s7GmZuvnv4xN9xsqdhXtYqpqE=",
      name: "Rohan Verma",
      title: "Data Scientist",
      info: "I found a fantastic hackathon team through UniColab! The skill-based matching is amazing—collaboration has never been this easy.",
    },
  ],
  bottom: [
    {
      id: 1,
      img: "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZhY2UlMjBpbmRpYW58ZW58MHx8MHx8fDA%3D",
      name: "Arjun Malhotra",
      title: "AI/ML Developer",
      info: "Thanks to UniColab, I joined an AI project with brilliant minds. It’s the easiest way to find the right teammates!",
    },
    {
      id: 2,
      img: "https://plus.unsplash.com/premium_photo-1691030255899-cccde3a4e04f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFjZSUyMGluZGlhbnxlbnwwfHwwfHx8MA%3D%3D",
      name: "Meera Nair",
      title: "Marketing Strategist",
      info: "UniColab streamlined finding collaborators for student startups. Connecting with skilled people is now effortless—perfect for aspiring entrepreneurs!",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1629269715587-5003f2ce745a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhY2UlMjBpbmRpYW58ZW58MHx8MHx8fDA%3D",
      name: "Kunal Joshi",
      title: "Cybersecurity Enthusiast",
      info: "UniColab is a game-changer! I found a passionate team for my research project within minutes—highly recommend for all students!",
    },
  ],
};

export default ScrollingTestimonials;