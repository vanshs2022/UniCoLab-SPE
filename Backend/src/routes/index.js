const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const contactRoutes = require("./contactRoutes");

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/contact", contactRoutes);

router.get("/ping", (req, res) => {
  res.status(200).json({ status: "Backend awake" });
});

module.exports = router;