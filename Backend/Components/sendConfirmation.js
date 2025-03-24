const nodemailer = require("nodemailer");
require("dotenv").config(); 

const sendConfirmation = async (userEmail, userName) => {
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
            subject: "Welcome to Our Platform!",
            text: `Hello ${userName},\n\nThank you for signing up! We're excited to have you on board.\n\nBest regards,\nTeam`
        };

        await sender.sendMail(receiver);
        console.log("Confirmation email sent successfully");
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

module.exports = { sendConfirmation };
