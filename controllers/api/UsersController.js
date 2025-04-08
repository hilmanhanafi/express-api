// import express
const express = require('express');

// import connection 
const connection = require('../../config/database');

// import validation
const { body, validationResult } = require('express-validator');

// import bcryptjs
const bcrypt = require('bcryptjs');

// get all users
const getAllUsers = (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message : 'Internal Server Error',
                data: err
            })
        }else{
            return res.status(200).json({
                status: true,
                message : 'List Data Users',
                data: rows
            })
        }
    });
}

// findUser
const findUser = (req, res) => {    
    connection.query('SELECT * FROM users WHERE id_users = ?', [req.params.id], (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message : 'Internal Server Error',
                data: err
            })
        }else{
            return res.status(200).json({
                status: true,
                message : 'Successfully Find Data',
                data: rows[0]                
            })
        }        
    });
}

// createUser with hash password
const createUser = async (req, res) => {
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

// updateUser
const updateUser = async (req, res) => {
        // Hash password dengan await
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        try {
    
            // Define formData
            let formData = {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            };

            connection.query('UPDATE users SET ? WHERE id_users = ?', [formData, req.params.id], (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        message : 'Internal Server Error',
                        data: err
                    })
                }else{
                    return res.status(200).json({
                        status: true,
                        message : 'Successfully Update Data',
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

// deleteUser
const deleteUser = (req, res) => {
    connection.query('DELETE FROM users WHERE id_users = ?', [req.params.id], (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message : 'Internal Server Error',
                data: err
            })
        }else{
            return res.status(200).json({
                status: true,
                message : 'Successfully Delete Data',
                data: rows[0]                
            })
        }        
    });
}

// export router
module.exports = { getAllUsers, findUser, createUser, updateUser, deleteUser };