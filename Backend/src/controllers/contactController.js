const path = require("path");
const { sendMail } = require(path.resolve(__dirname, '../../components/sendMail'));


exports.sendContactMail = async (req, res) => {
  try {
    await sendMail(req, res);
  } catch (error) {
    console.error("Error in contact form:", error);
    res.status(500).json({ message: "Failed to send contact mail" });
  }
};