// middleware/validateTask.js
const { body, validationResult } = require('express-validator');

const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateTask;
