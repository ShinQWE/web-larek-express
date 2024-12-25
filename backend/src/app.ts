/* eslint-disable linebreak-style */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { NotFoundError } from './errors/errors';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(requestLogger);

mongoose.connect('mongodb://127.0.0.1:27017/weblarek')
  .then(() => console.log('Подключение к MongoDB успешно'))
  .then((data) => console.log(data))
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', productRoutes);
app.use('/orders', orderRoutes);

app.use((_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
