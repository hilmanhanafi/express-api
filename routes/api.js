// import express
const express = require('express');

// init express router
const router = express.Router();

// import upload
const upload = require('../config/multer');

// import middleware
const authMiddleware = require('../middleware/authMiddleware');

// import validation from folder validation
const { loginValidation, registerValidation, postValidation, handleValidation } = require('../validation');

// import controller login
const loginController = require('../controllers/api/LoginController');

// import controller register
const registerController = require('../controllers/api/RegisterController');

// import  controller post
const postController = require('../controllers/api/PostController');

// import controller career
const careerController = require('../controllers/api/CareerController');

// import controller users
const usersController = require('../controllers/api/UsersController');

// define route register
router.post('/register', registerValidation, registerController.register);

// define route login
router.post('/login', loginValidation, loginController.login);

// define route post
router.get('/posts', authMiddleware, postController.allPost);

// define route post
router.get('/posts/:id', authMiddleware, postController.findPostById);

// define route post
router.post('/posts/store', authMiddleware, postValidation , upload.single('image'), postController.createPost);

// define route post
router.put('/posts/:id', authMiddleware, postValidation, postController.updatePost);

// define route post
router.delete('/posts/:id', authMiddleware, postController.deletePost);

// define route career
router.get('/careers', authMiddleware, careerController.getAllCareer);
router.get('/careers/nama/:nama', authMiddleware, careerController.getByNama);
router.get('/careers/nim/:nim', authMiddleware, careerController.getByNim);
router.get('/careers/ymd/:ymd', authMiddleware, careerController.getByYMD);

// define route users
router.get('/users', authMiddleware, usersController.getAllUsers);
router.get('/users/:id', authMiddleware, usersController.findUser);
router.post('/users/store', authMiddleware, usersController.createUser);
router.put('/users/:id', authMiddleware, usersController.updateUser);
router.delete('/users/:id', authMiddleware, usersController.deleteUser);


// export router
module.exports = router;