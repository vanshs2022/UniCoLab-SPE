const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.post("/get", profileController.getProfileByEmail);
router.post("/edit", profileController.createOrUpdateProfile);
router.get("/", profileController.getFilteredProfiles);
router.get("/:id", profileController.getProfileById);

module.exports = router;