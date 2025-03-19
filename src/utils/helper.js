require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.generateHasPassword = async (password) => {
  return await bcrypt.hash(password, 10);
}

exports.compareHashPassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword)
}

exports.generateToken = async (data) => {
  return jwt.sign(data, process.env.JWT_SECRET)
}