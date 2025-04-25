import { Request, Response } from "express";
import { AppDataSource } from "../../../config/data-source";
import { User } from "../../../modals/user.entity";
import { ApiError } from "../../../errors/api-error";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiResponse } from "../../../interfaces/ApiResponse";

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    try {
      const user = await userRepo.findOneBy({ email });

      if (!user) {
        throw ApiError.badRequest("Invalid credentials provided.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw ApiError.badRequest("Invalid credentials provided.");
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );
      const response: ApiResponse = {
        message: "User logged in successfully.",
        code: 200,
        status: "success",
        success: true,
        token,
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error during login:", error);
      throw error instanceof ApiError ? error : ApiError.internal();
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    const { email, password, name } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    try {
      const existingUser = await userRepo.findOneBy({ email });

      if (existingUser) {
        throw ApiError.badRequest("User with this email already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepo.create({
        email,
        password: hashedPassword,
        name,
      });

      await userRepo.save(newUser);

      const response: ApiResponse = {
        message: "User registered successfully.",
        code: 201,
        status: "success",
        success: true,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error("Error during registration:", error);
      throw error instanceof ApiError ? error : ApiError.internal();
    }
  }

  static async getMe(req: Request, res: Response): Promise<void> {
    try {
      let token = req.headers?.authorization;

      if (token?.startsWith("Bearer")) {
        token = token.split(" ")[1];
      }

      if (!token) {
        throw ApiError.unauthorized("No token provided.");
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          id: string;
          email: string;
        };

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ id: decoded.id });

        if (!user) {
          throw ApiError.unauthorized("User not found.");
        }

        const response: ApiResponse = {
          message: "User fetched successfully.",
          code: 200,
          status: "success",
          success: true,
          data: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        };

        res.status(200).json(response);
      } catch (err) {
        console.error("Error decoding token:", err);
        throw ApiError.unauthorized("Invalid token.");
      }
    } catch (error) {
      console.log(error);
      throw error instanceof ApiError ? error : ApiError.internal();
    }
  }
}
