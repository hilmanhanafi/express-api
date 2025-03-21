// import express
const express = require('express');

// create router
const router = express.Router();

// import connection
const connection = require('../config/database');

// import validator
const { body, validationResult } = require('express-validator');

// menampilkan data posts ke view
const allPost = (req, res) => {

    connection.query('SELECT * FROM posts ORDER BY id DESC', (err, rows) => {
        if (err) return res.status(500).send(err);
        // send to views
        res.render('index', { posts: rows });
    });

}

// export
module.exports = {allPost};