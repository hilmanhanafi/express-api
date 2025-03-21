// import express
const express = require('express');

// create router
const router = express.Router();

// import connection
const connection = require('../../config/database');

// import validator
const { body, validatiionResult } = require('express-validator');

// import bcryptjs
const bcrypt = require('bcryptjs');

// register
const register = async (req, res) => {
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
    try {

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
                })
            }else{
                return res.status(200).json({
                    status: true,
                    message : 'Successfully Insert Data',
                    data: rows[0]
                })
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message : 'Internal Server Error',
            data: error
        })
    }
}
    

// export register
module.exports = {register};