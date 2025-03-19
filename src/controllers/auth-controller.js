const UsersModel = require('../models/users-model.js');
const BadRequestError = require('../utils/bad-request-error.js');
const { generateHasPassword, compareHashPassword, generateToken } = require('../utils/helper.js');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await generateHasPassword(password);
    const user = await UsersModel.createUser(username, email, hashedPassword);
    res.status(201).json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UsersModel.findByUsername(username);
    if (!user) throw new BadRequestError('invalidCredentials');

    const valid = await compareHashPassword(password, user.password_hash);
    if (!valid) throw new BadRequestError('invalidCredentials');

    const token = await generateToken({ id: user.id, username: user.username });
    res.json({ success: true, data: { token } });
  } catch (err) {
    next(err);
  }
};
