const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const userData = require("./user.json");

mongoose.connect("mongodb://127.0.0.1:27017/profile", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB...");
}).catch(err => console.log("Connection error:", err));

const seedDB = async () => {
    try {
        await User.deleteMany({});

        // Hash passwords before inserting
        for (let user of userData) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
        
        await User.insertMany(userData);
        console.log("Data successfully inserted with hashed passwords!");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
