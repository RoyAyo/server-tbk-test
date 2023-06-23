import express from "express";
import eventController from "./event.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", eventController.readAll);
router.get("/:id",eventController.readOne);

router.post("/", authMiddleware, eventController.create);
router.put("/:id", authMiddleware, eventController.update);
router.delete("/:id", authMiddleware, eventController.delete);


export default router;