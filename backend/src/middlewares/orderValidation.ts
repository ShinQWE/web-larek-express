/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { celebrate, Joi, Segments } from 'celebrate';

export const createOrderValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string()
      .valid('card', 'online')
      .required()
      .messages({
        'any.only': 'Метод оплаты должен быть "card" или "online"',
        'any.required': 'Поле "payment" обязательно для заполнения',
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Некорректный email',
        'any.required': 'Поле "email" обязательно для заполнения',
      }),
    phone: Joi.string().required().messages({
      'any.required': 'Поле "phone" обязательно для заполнения',
    }),
    address: Joi.string().required().messages({
      'any.required': 'Поле "address" обязательно для заполнения',
    }),
    total: Joi.number().required().messages({
      'any.required': 'Поле "total" обязательно для заполнения',
    }),
    items: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .required()
      .messages({
        'array.base': 'Поле "items" должно быть массивом',
        'array.min': 'Поле "items" должно содержать хотя бы один элемент',
        'any.required': 'Поле "items" обязательно для заполнения',
      }),
  }),
});
