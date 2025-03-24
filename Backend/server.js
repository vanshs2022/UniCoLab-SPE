const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Profile = require("./models/ProfileModel");
const User = require("./models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {sendMail} = require("./Components/sendMail");
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

// Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // Correcting the field name from email to username
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, username, password: hashedPassword });
    await user.save();
    console.log("User saved successfully");

    await sendConfirmation(username, name);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "signup required" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post('/api/contact', sendMail);

// profile edit and create request
// Auth functionality yet to be added
app.post('/api/profile/edit', async (req, res) => {
  try {
    console.log('Received form data');
    req.body.skills = req.body.skills.map(skill => ({ name: skill }));
    const user = await User.find({username: req.body.username});
    if(!user){
      return res.status(500).json({ message: 'No user found' });
    } 
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
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));