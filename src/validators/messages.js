const { body } = require('express-validator');

const messageValidation = [
  body('receiverId')
    .notEmpty()
    .withMessage('receiverIdIsRequired')
    .isInt()
    .withMessage('receiverIdMustBeInt'),

  body('messageType')
    .notEmpty()
    .withMessage('messageTypeIsRequired')
    .isString()
    .withMessage('messageTypeMustBeString')
];

module.exports = {
  messageValidation
};
