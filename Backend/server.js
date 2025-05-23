const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Profile = require("./models/ProfileModel");
const User = require("./models/UserModel");
const {sendMail} = require("./Components/sendMail");
const {sendConfirmation} = require("./Components/sendConfirmation");
const {sendNotification} = require("./Components/sendNotification");
const auth = require("./middleware/auth");
require("dotenv").config(); 

const app = express();
app.use(express.urlencoded({ extended: true }));

main().then(() => {
  console.log("connection successful");
}).catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/profile");
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.post('/api/auth', async (req,res) => {
  res.json({ message: "User authenticated", user: req.user });
});

app.post('/api/contact', sendMail);

// profile edit functionality
app.post('/api/profile/edit', auth, async (req, res) => {
  try {
    console.log('Received form data');
    req.body.skills = req.body.skills.map(skill => ({ name: skill }));
    const profile = new Profile(req.body);
    await profile.save();
    res.status(200).json({ message: 'Message recieved!', profileId: profile._id });
  } catch (err) {
    console.error('Error saving profile:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// profile display and filteration
app.get('/api/profile', async (req, res) => {
  let query = {};
  console.log('Query received:', req.query);

  for (let key in req.query) {
    query[key] = { $regex: new RegExp(req.query[key], "i") };
  }

  const profiles = await Profile.find(query, "name profilePic role");
  res.send(profiles);
});

// individual profile display
app.get('/api/profile/:id', async (req, res) => {
  let { id } = req.params;
  const profile = await Profile.findById(id);
  res.send(profile);
  const username = profile.username;
  await sendNotification(username);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));