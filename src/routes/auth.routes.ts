import { Router } from "express";
import multer from "multer";
import { AuthHandler } from "../handlers/AuthHandler.ts";
import { AuthService } from "../services/AuthService.ts";

const router = Router();
const handler = new AuthHandler(new AuthService());

router.post("/register", handler.register.bind(handler));
router.post("/login", handler.login.bind(handler));

export default router;

