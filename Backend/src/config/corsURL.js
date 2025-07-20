const allowedOrigins = ["http://localhost:3000","http://localhost:3001","http://localhost:3002", "https://uni-colab.vercel.app","https://unicolab.onrender.com", "https://unicolab-three.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
