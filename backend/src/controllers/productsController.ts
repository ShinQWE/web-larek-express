/* eslint-disable linebreak-style */
import { Request, Response } from 'express';
import Product from '../models/product';
import { BadRequestError, ConflictError } from '../errors/errors';

// Получение всех товаров
export const getProducts = async (_req: Request, res: Response) => {
  const products = await Product.find();
  res.status(200).json(products);
};

// Создание нового товара
// eslint-disable-next-line consistent-return
export const createProduct = async (req: Request, res: Response, next: Function) => {
  const {
    title, image, category, description, price,
  } = req.body;

  const newProduct = new Product({
    title, image, category, description, price,
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
