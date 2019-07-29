import { Router, Request, Response } from "express";
const router = Router();

/**
 * Middlewares imports
 */
import authenticateUser from "../middlewares/authenticateUser";

/**
 * Controllers imports
 */
import * as AuthController from "../controllers/auth";
import * as UserController from "../controllers/users";

/**
 * Validators imports
 */
import * as authValidator from "../validators/auth";
import * as usersValidator from "../validators/users";

/**
 * Routes
 */
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Laranode API");
});

router.post("/auth/login", authValidator.login, AuthController.login);
router.post("/auth/register", authValidator.register, AuthController.register);

// Users
router.get("/users", authenticateUser, UserController.readMany);
router.get("/users/:id", authenticateUser, usersValidator.readOne, UserController.readOne);
router.patch("/users/:id", authenticateUser, usersValidator.updateOne, UserController.updateOne);
router.delete("/users/:id", authenticateUser, usersValidator.deleteOne, UserController.deleteOne);

export default router;
