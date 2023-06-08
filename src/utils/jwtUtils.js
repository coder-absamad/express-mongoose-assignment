const jwt = require('jsonwebtoken');

function generateToken(userId, secretKey) {
  const payload = {
    userId: userId
  };

  const options = {
    expiresIn: '1h'
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
}

module.exports = {
  generateToken
};
