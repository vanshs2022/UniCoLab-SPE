const http = require("http");
const nodemailer = require("nodemailer");

const sendMail = http.createServer((req, res) => {
    const sender = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "youremail@gmail.com",
            pass: "your_password"

        }
    });

    const receiver = {
        from : "youremail@gmail.com",
        to : "youremail@gmail.com",
        subject : "Node Js Mail Testing!",
        text : "Hello this is a text mail!"
    };

    sender.sendMail(receiver, (err, emailResponse) => {
        if(err)
        throw err;
        console.log("success!");
        res.status(200).json({ message: 'Message received!' });
        res.end();
    });
    
});

module.exports = sendMail;