const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Upload to src/uploads
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '_' + file.originalname.replaceAll(' ', ''));
  }
});

const upload = multer({ storage });

module.exports = upload;
