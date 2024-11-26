import express, { Router } from "express";
import { allProduct, addProduct } from "../controllers/product.controller";

const router: Router = express.Router();

router.get('/all-products', allProduct);

router.post('/add-products', addProduct);

export default router;
