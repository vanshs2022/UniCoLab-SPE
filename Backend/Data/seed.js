const mongoose = require("mongoose");
const Profile = require("../models/ProfileModel"); // Adjust path to your model file
const profilesData = require("./seed.json"); // Adjust path to JSON file

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/profile", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB...");
}).catch(err => console.log("Connection error:", err));

// Insert Data
const seedDB = async () => {
    try {
        await Profile.deleteMany({}); // Clears old data (optional)
        await Profile.insertMany(profilesData);
        console.log("Data successfully inserted!");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
