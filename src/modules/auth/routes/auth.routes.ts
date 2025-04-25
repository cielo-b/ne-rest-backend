import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authRouter = Router();
authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.get("/me", AuthController.getMe);

export default authRouter;
