// middleware/multer.js
const multer = require('multer');
const path = require('path');

// File storage in memory
const storage = multer.memoryStorage();

// File filter for images only
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, .png files allowed'), false);
  }
};

module.exports = multer({ storage, fileFilter });
