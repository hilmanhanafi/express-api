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

// import jwt
const jwt = require('jsonwebtoken');

// secret key
const SECRET_KEY = '4a9fba458ef22babcc92723035eb1afe362a6c2dc683fc94f2d8af5adc288ffd';


// login
router.post('/', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
],  (req, res) => {
        // Check error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message : 'Validation Error',
                errors : errors.array()
            });
        }

        // check user
       connection.query('SELECT * FROM users WHERE email = ?', [req.body.email],(err, rows) => {

            // if user not found
            if(rows.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message : 'User Not Found',
                })
            }else{
                // if user found
                // compare password
                const validPassword = bcrypt.compare(req.body.password, rows[0].password);  

                // if password not match
                if(!validPassword) {
                    return res.status(401).json({
                        status: false,
                        message : 'Invalid Password',
                    })
                }

                // if password match
                else{
                    // generate token
                    const token = jwt.sign({
                        id: rows[0].id,
                    }, SECRET_KEY, {
                        expiresIn: '1d'
                    });

                    // destructure remove password
                    const { password, ...user } = rows[0];

                    // return token and user data
                    return res.status(200).json({
                        status: true,
                        message : 'Login Success',
                        data: {
                            token: token,
                            user: user
                         
                        }
                    })
                }
            }            
        });
}); 


// export router
module.exports = router;