const nodemailer = require("nodemailer");
require("dotenv").config(); 

const sendMail = async (req, res) => {
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
            to: process.env.EMAIL_USER,
            subject: `Query from ${req.body.name}`,
            text: `Mail id: ${req.body.email}\n\nMessage: \n${req.body.message} `
        };

        const emailResponse = await sender.sendMail(receiver);
        
        return res.status(200).json({ message: "Email sent successfully!" });
    } catch (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ message: "Error sending email", error: err.message });
    }
};

module.exports = { sendMail };
