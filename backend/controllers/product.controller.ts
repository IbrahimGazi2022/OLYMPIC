import { Request, Response } from "express";
import { productModel } from "../models/product.model"

export const allProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productModel.find();
        res.send(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};
