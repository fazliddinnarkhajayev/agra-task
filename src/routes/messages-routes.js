const express = require('express');

const { sendMessage } = require('../controllers/messages-controller.js');
const { messageValidation } = require('../validators/messages.js');
const { validate } = require('../middlewares/validate.js');
const upload = require('../configs/multer.config.js');

const router = express.Router();

router.post('/send', upload.single('file'), messageValidation, validate, sendMessage);

module.exports = router;
