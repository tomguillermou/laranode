import { Router } from "express";
const router = Router();

import * as authValidators from "./validators";

import * as authController from "./controller";

router.post("/auth/login", authValidators.login, authController.login);
router.post("/auth/register", authValidators.register, authController.register);

export default router;
