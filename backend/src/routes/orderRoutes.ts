/* eslint-disable linebreak-style */
import { Router } from 'express';
import { createOrder } from '../controllers/orderController';
import { createOrderValidation } from '../middlewares/orderValidation';

const router = Router();

router.post('/', createOrderValidation, createOrder);

export default router;
