const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: 'demoUser123' },
  'secretkey',
  { expiresIn: '1h' }
);

console.log(token);
