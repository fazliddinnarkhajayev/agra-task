const express = require('express');
const { register, login } = require('../controllers/auth-controller.js');
const { registerValidation, loginValidation } = require('../validators/users.js');
const { validate } = require('../middlewares/validate.js');
const router = express.Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

module.exports = router;
