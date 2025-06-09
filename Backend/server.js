const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Profile = require("./models/ProfileModel");
const User = require("./models/UserModel");
const { sendMail } = require("./Components/sendMail");
const { sendConfirmation } = require("./Components/sendConfirmation");
const { sendNotification } = require("./Components/sendNotification");
const auth = require("./middleware/auth");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.DATABASE_URL
  );
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.post("/api/auth", async (req, res) => {
  res.json({ message: "User authenticated", user: req.user });
});

app.post("/api/contact", sendMail);

function extractSkillNames(skills) {
  return Array.isArray(skills) ? skills.map(skill => skill.name) : [];
}

// profile finding using email
app.post("/api/profile/get", async (req, res) => {
  try {
    let email = req.body.email;
    console.log('Recieved email id: ' + email);
    const profile = await Profile.findOne({ username: email });

    if (profile) {
      const plainProfile = profile.toObject(); 
      plainProfile.skills = extractSkillNames(plainProfile.skills);
      console.log('Profile for ' + email + ' sent');
      res.status(200).json({ message: "User Found", profile: plainProfile });
    } else {
      res.status(200).json({ message: "No user Found", profile: null });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});


function isArrayOfStrings(arr) {
  return Array.isArray(arr) && arr.every((item) => typeof item === "string");
}

// profile create functionality
app.post("/api/profile/edit", async (req, res) => {
  try {
    console.log("Received form data");
    if (req.body) console.log("Form Data Recieved");
    req.body.skills = req.body.skills.map((e) => {
      if (typeof e === "object" && e !== null && "name" in e) {
        return e.name;
      }
      return e;
    });
    if (isArrayOfStrings(req.body.skills)) {
      req.body.skills = req.body.skills.map((skill) => ({ name: skill }));
    }
    let user = await Profile.findOne({ username: req.body.username });
    console.log(user);
    if (user) {
      const updatedUser = await Profile.findOneAndUpdate(
        { username: req.body.username },
        req.body,
        { new: true, runValidators: true }
      );
      res
        .status(200)
        .json({ message: "Message Recieved!", profileId: updatedUser._id });
    } else {
      const profile = new Profile(req.body);
      await profile.save();
      res
        .status(200)
        .json({ message: "Message Recieved!", profileId: profile._id });
    }
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// profile display and filteration
app.get("/api/profile", async (req, res) => {
  let query = {};
  console.log("Query received:", req.query);

  for (let key in req.query) {
    query[key] = { $regex: new RegExp(req.query[key], "i") };
  }

  const profiles = await Profile.find(query, "name profilePic role");
  res.send(profiles);
});

// individual profile display
app.get("/api/profile/:id", async (req, res) => {
  let { id } = req.params;
  const profile = await Profile.findById(id);
  res.send(profile);
  const username = profile.username;
  await sendNotification(username);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
