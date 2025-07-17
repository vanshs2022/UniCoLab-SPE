const express = require("express");
const router = express.Router();
const upload = require('../middlewares/multer');
const imageController = require('../controllers/imageController');

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const contactRoutes = require("./contactRoutes");
const imageRoutes = require("./imageRoutes");

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/contact", contactRoutes);
router.post('/upload', upload.single('image'), imageController.uploadImage);

router.get("/ping", (req, res) => {
  res.status(200).json({ status: "Backend awake" });
});

module.exports = router;