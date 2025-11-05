const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  const { username, password } = req.body;

  
  if (username === 'bajajK' && password === 'abcd1234') {
    const token = jwt.sign({ id: 1, username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY});
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
