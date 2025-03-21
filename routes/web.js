// import express
const express = require('express');

// create router
const router = express.Router();

// import controller
const postController = require('../controllers/PostController');

// import middleware
const authMiddleware = require('../middleware/authMiddleware');

// define route post
router.get('/posts', postController.allPost);


// module export
module.exports = router;