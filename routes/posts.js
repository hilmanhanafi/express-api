// import express
const express = require('express');

// create router
const router = express.Router();

// import connection
const connection = require('../config/database');

// import validator
const { body, validationResult } = require('express-validator');


// get all posts
router.get('/', (req, res) => {
    connection.query('SELECT * FROM posts ORDER BY id DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message : 'Internal Server Error',
                data: err
            })
          
           
            
        }else{
            return res.status(200).json({
                status: true,
                message : 'List Data Posts',
                data: rows
            })
        }
    });
});

// store post
router.post('/store', [
    
    // validation
    body('title').notEmpty(),
    body('content').notEmpty(),

], (req, res) => {
    // check error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message : 'Validation Error',
            errors : errors.array()
        })
    }
    
    // define formData
    let formData = {
        title: req.body.title,
        content: req.body.content
    }
    
    // insert into database
    connection.query('INSERT INTO posts SET ?', formData, (err, rows) => {
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
});

// show post by id
router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message : 'Internal Server Error',
                data: err
            })
        }

        // if post not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message : 'Post Not Found',

            })
        
        // if post found
        }else{
            return res.status(200).json({
                status: true,
                message : 'Detail Post',
                data: rows[0]
            })
        }
    });
});


// update post by id
router.patch('/update/:id', [
    
    // validation
    body('title').notEmpty(),
    body('content').notEmpty(),

], (req, res) => {
    // check error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message : 'Validation Error',
            errors : errors.array()
        })
    }

    // id
    let id = req.params.id;

    // define formData
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    // update into database 
    connection.query('UPDATE posts SET ? WHERE id = ?', [formData, id], (err, rows) => {
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
});

// delete post by id
router.delete('/delete/:id', (req, res) => {
    connection.query('DELETE FROM posts WHERE id = ?', [req.params.id], (err, rows) => {
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
}); 
    

// export router
module.exports = router;