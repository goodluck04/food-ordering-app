import express from "express";
import myUserController from "../controllers/myUserController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

router.post("/", jwtCheck, myUserController.createCurrentUser);

export default router;
