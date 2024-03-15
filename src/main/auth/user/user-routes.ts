import express from "express";
import userController from "./user-controller";
const router = express.Router();

router.post("/user/auth/register", userController.register);

router.post("/user/auth/login", userController.login);

export default router;
