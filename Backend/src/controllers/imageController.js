// controllers/imageController.js
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

exports.uploadImage = async (req, res) => {
  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'uploads' }, // Optional: set folder
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Image upload failed' });
  }
};
