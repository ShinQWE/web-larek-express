/* eslint-disable linebreak-style */
import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, '"title" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
  },
  image: {
    fileName: { type: String, required: true },
    originalName: { type: String, required: true },
  },
  category: {
    type: String,
    required: [true, '"category" должно быть заполнено'],
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    default: null,
  },
});

export default model('Product', productSchema);
