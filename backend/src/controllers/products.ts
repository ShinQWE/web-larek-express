/* eslint-disable linebreak-style */
import { Request, Response } from 'express';
import Product from '../models/product';
import { BadRequestError, ConflictError } from '../errors/errors';

// Получение всех товаров
// eslint-disable-next-line consistent-return
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ items: products });
  } catch (error) {
    // eslint-disable-next-line no-use-before-define
    return next(new BadRequestError('Ошибка получения товаров.'));
  }
};
// Создание нового товара
// eslint-disable-next-line consistent-return, @typescript-eslint/no-shadow
export const createProduct = async (req: Request, res: Response, next: Function) => {
  const {
    title, image, category, description, price,
  } = req.body;

  const newProduct = new Product({
    title,
    image: {
      fileName: image.fileName,
      originalName: image.originalName,
    },
    category,
    description,
    price,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким названием уже существует.'));
    }
    return next(new BadRequestError('Ошибка создания товара.'));
  }
};
function next(_arg0: BadRequestError) {
  throw new Error('Ошибка');
}
