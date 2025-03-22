// import express validator
const { body } = require('express-validator');

// import connection
const connection = require('../config/database');

// validasi untuk login
const loginValidation = [
    body('email')
        .notEmpty().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')

];

// validasi untuk register
const registerValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .custom(async (value) => {
            if(!value) {
                throw new Error('Email is required');
            }
            const user = connection.query('SELECT * FROM users WHERE email = ?', [value]);
            if (user) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // body('confirmPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// validasi untuk post
const postValidation = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('content')
        .notEmpty().withMessage('Content is required')
        .isLength({ min: 3 }).withMessage('Body must be at least 3 characters long')
];

// validasi users
const userValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .custom(async (value) => {
            if(!value) {
                throw new Error('Email is required');
            }
            const user = connection.query('SELECT * FROM users WHERE email = ?', [value]);
            if (user) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // body('confirmPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// handle validation
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message : 'Validation Error',
            errors : errors.array()
        })
    }
    next();
}

// export
module.exports = {
    loginValidation,
    registerValidation,
    postValidation,
    userValidation,
    handleValidation,
}