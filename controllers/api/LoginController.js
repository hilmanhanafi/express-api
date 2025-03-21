// import express
const express = require('express');

// import validation
const { body, validationResult } = require('express-validator');

// import bcryptjs
const bcrypt = require('bcryptjs');

// import jwt token
const jwt = require('jsonwebtoken');

// import connection
const connection = require('../../config/database');

// secret key
const SECRET_KEY = process.env.JWT_SECRET;

// expired
const expired = process.env.JWT_EXPIRES;


const login = async (req, res) => {
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

        // Check user
        connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], async (err, rows) => {
            if (err) {  
                return res.status(500).json({
                    status: false,
                    message : 'Internal Server Error',
                    data: err
                })
            }

            // If user not found
            if (rows.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message : 'User Not Found',
                })
            }else{
                // If user found
                // Compare password
                const validPassword = await bcrypt.compare(req.body.password, rows[0].password);  
                
                // If password not match
                if(!validPassword) {
                    return res.status(401).json({
                        status: false,
                        message : 'Invalid Password',
                    })
                }                

                // If password match
                else{
                    // Generate token   
                    const token = jwt.sign({
                        id: rows[0].id,
                    }, SECRET_KEY, {
                        expiresIn: expired
                    });

                    // Destructure remove password
                    const { password, ...user } = rows[0];

                    // Send response
                    return res.status(200).json({
                        status: true,
                        message : 'Login Success',
                        data: {
                            user,
                            token
                        }
                    })
                }
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

module.exports = {
    login
}