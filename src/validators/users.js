const { body } = require('express-validator');

const registerValidation = [
  body('username')
    .notEmpty()
    .withMessage('usernameIsRequired'),

  body('email')
    .notEmpty()
    .withMessage('usernameIsRequired')
    .isEmail()
    .withMessage('invalidEmailFormat'),

  body('password')
    .notEmpty()
    .withMessage('passwordIsRequired')
];

const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('usernameIsRequired'),

  body('password')
    .notEmpty()
    .withMessage('passwordIsRequired')
];

module.exports = {
  registerValidation,
  loginValidation
};
