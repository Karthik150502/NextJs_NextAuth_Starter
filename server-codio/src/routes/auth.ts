import { Router } from "express";
import AuthController from "../controller/auth";

const router = Router();

router.post("/sign-in", AuthController.login);


export default router;