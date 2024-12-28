/* eslint-disable */
import { Request, Response } from 'express';
import Product from '../models/product';
import { faker } from '@faker-js/faker';
import { BadRequestError } from '../errors/errors';

// Оформление заказа
export const createOrder = async (req: Request, res: Response, next: Function) => {
    const { payment, email, phone, address, total, items } = req.body;

    // Валидация полей
    if (!Array.isArray(items) || items.length === 0) {
        return next(new BadRequestError('Поле items должно быть непустым массивом.'));
    }

    const products = await Product.find({ _id: { $in: items } });

    // Проверка существования товаров и их цены
    const invalidProducts = products.filter(product => product.price === null);
    if (invalidProducts.length > 0) {
        return next(new BadRequestError('Некоторые товары недоступны для продажи.'));
    }

    // Проверка общей суммы заказа
    const calculatedTotal = products.reduce((sum, product) => sum + (product.price || 0), 0);
    if (calculatedTotal !== total) {
        return next(new BadRequestError('Сумма заказа не совпадает с общей стоимостью товаров.'));
    }

    // Валидация других полей
    const validPayments = ['card', 'online'];
    if (!validPayments.includes(payment)) {
        return next(new BadRequestError('Некорректный метод оплаты.'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new BadRequestError('Некорректный email.'));
    }

    if (!phone || !address) {
        return next(new BadRequestError('Поле phone и address обязательно.'));
    }

    // Генерация ID заказа
    const orderId = faker.string.uuid();

    // Возвращаем ответ
    res.status(201).json({
        id: orderId,
        total: calculatedTotal,
    });
};