import { Request, Response } from "express";
import { AppDataSource } from "../../../config/data-source";
import { Book } from "../../../modals/book.entity";
import { ApiResponse } from "../../../interfaces/ApiResponse";
import { ApiError } from "../../../errors/api-error";

export class BookController {
  static async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const bookRepo = AppDataSource.getRepository(Book);
      const response: ApiResponse = {
        code: 200,
        status: "success",
        success: true,
        data: await bookRepo.find(),
      };
      res.status(200).json(response);
    } catch (error) {
      throw error instanceof ApiError ? error : ApiError.internal();
    }
  }

  static async getBookById(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) throw ApiError.badRequest("The book id is required.");
      const bookRepo = AppDataSource.getRepository(Book);
      if (!(await bookRepo.existsBy({ id: req.params.id })))
        throw ApiError.notFound(`Book ${req.params.id} not found!`);

      const response: ApiResponse = {
        code: 200,
        status: "success",
        success: true,
        data: (await bookRepo.findOneBy({ id: req.params.id })) || {},
      };
      res.status(200).json(response);
    } catch (error) {
      throw error instanceof ApiError ? error : ApiError.internal();
    }
  }

  static async createBook(req: Request, res: Response) {
    try {
      const bookRepo = AppDataSource.getRepository(Book);
      const { title, author, description } = req.body;
      if (await bookRepo.existsBy({ title }))
        throw ApiError.badRequest(`Book ${title} already exists.`);

      const newBook = bookRepo.create({ title, author, description });
      const savedBook = await bookRepo.save(newBook);

      const response: ApiResponse = {
        code: 201,
        status: "success",
        success: true,
        data: savedBook,
      };
      res.status(201).json(response);
    } catch (error) {
      throw error instanceof ApiError ? error : ApiError.internal();
    }
  }

  static async updateBook(req: Request, res: Response): Promise<void> {
    try {
      const bookRepo = AppDataSource.getRepository(Book);
      const { id } = req.params;
      const { title, author, description } = req.body;

      if (!id) throw ApiError.badRequest("The book id is required.");
      if (!(await bookRepo.existsBy({ id })))
        throw ApiError.notFound(`Book ${id} not found!`);

      const bookToUpdate = await bookRepo.findOneBy({ id });
      if (!bookToUpdate) throw ApiError.notFound(`Book ${id} not found!`);

      bookToUpdate.title = title || bookToUpdate.title;
      bookToUpdate.author = author || bookToUpdate.author;
      bookToUpdate.description = description || bookToUpdate.description;

      const updatedBook = await bookRepo.save(bookToUpdate);

      const response: ApiResponse = {
        code: 200,
        status: "success",
        success: true,
        data: updatedBook,
      };
      res.status(200).json(response);
    } catch (error) {
      throw error instanceof ApiError ? error : ApiError.internal();
    }
  }

  static async deleteBook(req: Request, res: Response): Promise<void> {
    try {
      const bookRepo = AppDataSource.getRepository(Book);
      const { id } = req.params;

      if (!id) throw ApiError.badRequest("The book id is required.");
      if (!(await bookRepo.existsBy({ id })))
        throw ApiError.notFound(`Book ${id} not found!`);

      await bookRepo.delete({ id });

      const response: ApiResponse = {
        code: 200,
        status: "success",
        success: true,
        data: `Book ${id} has been deleted successfully.`,
      };
      res.status(200).json(response);
    } catch (error) {
      throw error instanceof ApiError ? error : ApiError.internal();
    }
  }
}
