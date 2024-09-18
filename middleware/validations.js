const { body, param, validationResult } = require('express-validator');

// Middleware for validating user input
const validateUsernameEmail = [
  body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .escape(),
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .escape(),

  // Validation result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the controller if validation passes
  }
];

const validateEmail = [
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .escape(),

  // Validation result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the controller if validation passes
  }
];

const validateUUID = [
  param('id')
    .isUUID()
    .withMessage('Invalid id')
    .escape(),  // Escapes HTML characters
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the controller if validation passes
  }
]

module.exports = { validateEmail, validateUsernameEmail, validateUUID };
