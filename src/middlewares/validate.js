const { validationResult } = require('express-validator');

exports.validate = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      messages: errors.array()?.map(el => el.msg),
    });
  } else {
    next()
  }
}