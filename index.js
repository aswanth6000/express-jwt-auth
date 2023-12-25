const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const jwtSecret = process.env.JWT_KEY || 'defaultSecret';

function verifyToken(req, res, next) {
  let authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    res.status(401).send({ error: 'No token provided' });
  }

  let token = authHeader?.split(' ')[1];
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(500).send({ message: 'Authentication failed' });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}

module.exports = verifyToken;
