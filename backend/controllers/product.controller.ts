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

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const newItem = new productModel(req.body);
        await newItem.save();
        res.send("Item Added Successfully");
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};


