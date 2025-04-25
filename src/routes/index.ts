import { Router } from "express";
import authRouter from "../modules/auth/routes/auth.routes";
import bookRouter from "../modules/book/routes/book.routes";

const router = Router();
router.use("/auth", authRouter);
router.use("/books", bookRouter)

export default router;
