import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./config/data-source";
import { asyncContext, CONTEXT_KEYS } from "./common/async-context";
import { errorHandler } from "./middlewares/error.middleware";
import router from "./routes";
import cors from "cors";
import dotenv from 'dotenv'

dotenv.config()

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected.");
    app.listen(3000, () =>
      console.log("Server running on http://127.0.0.1:3000")
    );
  })
  .catch((e) => console.log(e));

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: false,
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  asyncContext.run(() => {
    const user = (req as any).user;
    if (user) {
      asyncContext.set(CONTEXT_KEYS.USER_ID, user.id);
    }
    next();
  });
});

app.use("/api/v1", router);

app.use(errorHandler);
