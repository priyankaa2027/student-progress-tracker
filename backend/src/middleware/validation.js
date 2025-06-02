const { body } = require('express-validator');

const studentValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    
    body('subject')
        .trim()
        .notEmpty()
        .withMessage('Subject is required'),
    
    body('score')
        .isInt({ min: 0, max: 100 })
        .withMessage('Score must be a number between 0 and 100'),
    
    body('progressLevel')
        .isIn(['Beginner', 'Intermediate', 'Advanced'])
        .withMessage('Progress level must be either Beginner, Intermediate, or Advanced')
];

module.exports = studentValidation;
