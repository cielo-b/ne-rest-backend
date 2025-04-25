import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api-error";
import { ApiResponse } from "../interfaces/ApiResponse";

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err instanceof ApiError ? err.code : 500;
  const message = err.message || "Internal Server Error.";
  console.log("here");

  console.log(err instanceof ApiError )

  const response: ApiResponse = {
    status: "error",
    success: false,
    message,
    code: status,
  };
  res.status(status).json(response);
};
