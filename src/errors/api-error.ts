export class ApiError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }

  static badRequest(msg: string) {
    return new ApiError(msg, 400);
  }

  static unauthorized(msg: string) {
    return new ApiError(msg, 401);
  }

  static forbidden(msg: string) {
    return new ApiError(msg, 403);
  }

  static notFound(msg: string) {
    return new ApiError(msg, 404);
  }

  static internal(msg = "Internal Server Error.") {
    return new ApiError(msg, 500);
  }
}
