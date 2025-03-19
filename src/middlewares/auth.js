const jwt = require('jsonwebtoken');
const { checkByUserIdIfExists } = require('../models/users-model');

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ success: false, messages: ['unauthorized'] });
  
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {

    if (err) return res.status(403).json({ success: false, messages: ['invalidToken'] });

    const userExists = await checkByUserIdIfExists(data.id);
    if(!userExists) return res.status(403).json({ success: false, messages: ['invalidUser'] });

    req.user = data;
    next();
  });
  } catch(err) {
    res.status(500).json({ success: false, messages: ['internalServerError'] });
  }
}

module.exports = { authMiddleware };
