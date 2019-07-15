const express = require('express');

const router = express.Router();

/**
 * Middlewares imports
 */
const authenticateUser = require('../middlewares/authenticateUser');

/**
 * Controllers imports
 */
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

/**
 * Routes
 */
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);

// Users
router.get('/users', authenticateUser, UserController.readMany);
router.get('/users/:id', authenticateUser, UserController.readOne);
router.patch('/users/:id', authenticateUser, UserController.updateOne);
router.delete('/users/:id', authenticateUser, UserController.deleteOne);

module.exports = router;
