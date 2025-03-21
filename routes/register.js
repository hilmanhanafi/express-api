// import express
const express = require('express');

// create router
const router = express.Router();

// import connection    
const connection = require('../config/database');

// import validator
const { body, validationResult } = require('express-validator');

// import bcryptjs
const bcrypt = require('bcryptjs');

// register
router.post('/', [
    body('name').notEmpty(),    
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
    
], async (req, res) => {  // Tambahkan async di sini


    
    try {
        // Check error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message : 'Validation Error',
                errors : errors.array()
            });
        }

        // Hash password dengan await
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        // Define formData
        let formData = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        };

        // Insert into database
        connection.query('INSERT INTO users SET ?', formData, (err, rows) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message : 'Internal Server Error',
                    data: err
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message : 'Successfully Insert Data',
                    data: rows
                });
            }
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error hashing password', error });
    }
});


// export router
module.exports = router;