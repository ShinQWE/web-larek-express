/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { celebrate, Joi, Segments } from 'celebrate';

export const createProductValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).required()
      .messages({
        'string.base': 'Поле "title" должно быть строкой',
        'string.empty': 'Поле "title" не должно быть пустым',
        'string.min': 'Минимальная длина поля "title" - 2',
        'string.max': 'Максимальная длина поля "title" - 30',
        'any.required': 'Поле "title" обязательно для заполнения',
      }),
    image: Joi.object()
      .keys({
        fileName: Joi.string().required(),
        originalName: Joi.string().required(),
      })
      .required(),
    category: Joi.string().required().messages({
      'string.empty': 'Поле "category" не должно быть пустым',
      'any.required': 'Поле "category" обязательно для заполнения',
    }),
    description: Joi.string().optional(),
    price: Joi.number().allow(null).optional(),
  }),
});
