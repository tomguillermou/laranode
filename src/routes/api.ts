import { Router, Request, Response } from "express";
const router = Router();

/**
 * Middlewares imports
 */
import authenticateUser from "../middlewares/authenticateUser";

/**
 * Controllers imports
 */
import * as AuthController from "../controllers/AuthController";
import * as UserController from "../controllers/UserController";

/**
 * Validators imports
 */
import * as authValidator from "../validators/auth";

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
router.get("/users/:id", authenticateUser, UserController.readOne);
router.patch("/users/:id", authenticateUser, UserController.updateOne);
router.delete("/users/:id", authenticateUser, UserController.deleteOne);

export default router;
