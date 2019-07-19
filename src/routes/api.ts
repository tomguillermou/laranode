import { Router } from 'express';
const router = Router();

/**
 * Middlewares imports
 */
import authenticateUser from "../middlewares/authenticateUser";

/**
 * Controllers imports
 */
import * as AuthController from '../controllers/AuthController';
import * as UserController from '../controllers/UserController';

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

export default router;
