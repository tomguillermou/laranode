import { Router } from "express";
const router = Router();

import authenticateUser from "../../middlewares/authenticateUser";

import * as userValidator from "./validators";

import * as userController from "./controller";

router.get("/users", authenticateUser, userController.readMany);
router.get("/users/:username", authenticateUser, userValidator.readOne, userController.readOne);
router.patch("/users/:username", authenticateUser, userValidator.updateOne, userController.updateOne);
router.delete("/users/:username", authenticateUser, userValidator.deleteOne, userController.deleteOne);

export default router;
