import express from "express";
import userController from "./user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", userController.register);
router.post("/get-token", userController.createToken);
router.post("/is-whitelisted", authMiddleware, userController.isWhitelist);

export default router;