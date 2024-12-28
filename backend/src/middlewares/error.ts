/* eslint-disable linebreak-style */
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/errors';

const errorMiddleware = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Внутренняя ошибка сервера';

  res.status(statusCode).json({
    message,
  });
};

export default errorMiddleware;
