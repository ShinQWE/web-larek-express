/* eslint-disable linebreak-style */
import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/productsController';
import { createProductValidation } from '../middlewares/productValidation';

const router = Router();

router.get('/', getProducts);

router.post('/', createProductValidation, createProduct);

export default router;
