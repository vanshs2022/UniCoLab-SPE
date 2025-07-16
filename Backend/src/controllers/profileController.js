const path = require("path");
const Profile = require("../models/ProfileModel");
const { sendNotification } = require(path.resolve(__dirname, '../../Components/sendNotification.js'));


const extractSkillNames = (skills) =>
  Array.isArray(skills) ? skills.map((s) => s.name) : [];

const isArrayOfStrings = (arr) =>
  Array.isArray(arr) && arr.every((item) => typeof item === "string");

exports.getProfileByEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const profile = await Profile.findOne({ username: email });
    if (profile) {
      const plainProfile = profile.toObject();
      plainProfile.skills = extractSkillNames(plainProfile.skills);
      res.status(200).json({ message: "User Found", profile: plainProfile });
    } else {
      res.status(200).json({ message: "No user Found", profile: null });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createOrUpdateProfile = async (req, res) => {
  try {
    req.body.skills = req.body.skills.map((e) =>
      typeof e === "object" && e !== null && "name" in e ? e.name : e
    );
    if (isArrayOfStrings(req.body.skills)) {
      req.body.skills = req.body.skills.map((skill) => ({ name: skill }));
    }

    let user = await Profile.findOne({ username: req.body.username });
    if (user) {
      const updatedUser = await Profile.findOneAndUpdate(
        { username: req.body.username },
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json({ message: "Updated", profileId: updatedUser._id });
    } else {
      const profile = new Profile(req.body);
      await profile.save();
      res.status(200).json({ message: "Created", profileId: profile._id });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getFilteredProfiles = async (req, res) => {
  let query = {};
  for (let key in req.query) {
    query[key] = { $regex: new RegExp(req.query[key], "i") };
  }
  const profiles = await Profile.find(query, "name profilePic role");
  res.send(profiles);
};

exports.getProfileById = async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  res.send(profile);
  await sendNotification(profile.username);
};