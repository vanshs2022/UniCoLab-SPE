const nodemailer = require("nodemailer");
require("dotenv").config(); 

const sendNotification = async (userEmail) => {
    try {
        const sender = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            }
        });

        const receiver = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Profile View",
            text: `Someone viewed your profile!!`
        };

        await sender.sendMail(receiver);
        console.log("Notification sent successfully");
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

module.exports = { sendNotification };
