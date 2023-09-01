import { StatusCodes } from '../enum';

interface IOptions {
  error_code?: string;
  payload?: Record<string, unknown>;
}

export interface IErrorParsed {
  status_code: StatusCodes;
  message: string;
  error_code?: string;
  body?: string;
}

export interface IError {
  name: string;
  message: string;
  stack?: string;
}

export class CustomError extends Error {
  constructor(message: string, statusCode: StatusCodes, options?: IOptions) {
    const messageError = JSON.stringify({
      status_code: statusCode || StatusCodes.InternalServerError,
      body: {
        code: options?.error_code,
        message: message || 'Internal Server Error',
        detail: options?.payload
      }
    });
    super(messageError);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string, options?: IOptions) {
    super(message, StatusCodes.BadRequest, options);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string, options?: IOptions) {
    super(message, StatusCodes.InternalServerError, options);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, options?: IOptions) {
    super(message, StatusCodes.NotFound, options);
  }
}
