// import express
const express = require('express');

// create router
const router = express.Router();

// import connection
const connection = require('../../config/database');

// import validator
const { body, validationResult } = require('express-validator');

// all post
const allPost = (req, res) => {
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
}

// findPost
const findPost = (req, res) => {
    connection.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, rows) => {
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

// createPost
const createPost = (req, res) => {
    // validasi file
    if (!req.file) {
        return res.status(400).json({
            status: false,
            message : 'File gambar harus diunggah!',
        })
    }

    // destructure
    const { title, content } = req.body;

    const imageUrl = req.file.filename;

    const formData = {
        title,
        content,
        image: imageUrl
    }

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
}

// findPostById
const findPostById = (req, res) => {
    connection.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, rows) => {
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

// updatePost
const updatePost = (req, res) => {
    connection.query('UPDATE posts SET ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
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
}

// deletePost
const deletePost = (req, res) => {
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
}


// export router
module.exports = {allPost, findPost, createPost, findPostById, updatePost, deletePost};