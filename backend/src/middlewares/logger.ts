/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import winston from 'winston';
import expressWinston from 'express-winston';

// Логгер запросов
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// Логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

export { requestLogger, errorLogger };
