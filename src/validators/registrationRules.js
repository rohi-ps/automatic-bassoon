
const { body } = require('express-validator');

const isStrongPassword = value => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!regex.test(value)) {
    throw new Error('Password must be at least 8 characters, include a number and an uppercase letter');
  }
  return true;
};

const registrationRules = [
  body('username')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
    .custom(value => {
      if (value === 'admin') {
        throw new Error('Username "admin" is not allowed');
      }
      return true;
    }),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').custom(isStrongPassword),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
];

module.exports = registrationRules;
