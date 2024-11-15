import express, { Router } from "express";
import { allProduct } from "../controllers/product.controller";

const router: Router = express.Router();

router.get('/all-products', allProduct);

export default router;
