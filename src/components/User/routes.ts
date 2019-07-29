import { Router, Request, Response } from "express";
const router = Router();

import authenticateUser from "../../middlewares/authenticateUser";

import * as userValidator from "./validators";

import * as userController from "./controller";

router.get("/users", authenticateUser, userController.readMany);
router.get("/users/:id", authenticateUser, userValidator.readOne, userController.readOne);
router.patch("/users/:id", authenticateUser, userValidator.updateOne, userController.updateOne);
router.delete("/users/:id", authenticateUser, userValidator.deleteOne, userController.deleteOne);

export default router;
