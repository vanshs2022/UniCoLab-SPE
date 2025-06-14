const mongoose = require("mongoose");
const defProjectURL = "";

const profileSchema = new mongoose.Schema({
    name: String,
    username: String,
    profilePic: String,
    description: String,
    githubLink: String, 
    skills: [
        {
            name: { type: String, required: true },
        }
    ],
    projects: 
        {
            project1: String,
            project2: String,
        },
    role: String,
    resume: String,
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
