const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const auth = require("../middlewares/auth");

router.post("/get", auth ,profileController.getProfileByEmail);
router.post("/edit", auth , profileController.createOrUpdateProfile);
router.get("/", profileController.getFilteredProfiles);
router.get("/:id", profileController.getProfileById);

module.exports = router;