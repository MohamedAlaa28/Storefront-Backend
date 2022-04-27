import express, { Request, Response } from "express";
import { product, productStore } from "../models/Product";
import jwt from "jsonwebtoken";

const store = new productStore();
//calling index method for product table
const index = async (req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};
//calling show method for product table
const show = async (req: Request, res: Response) => {
  const product = await store.show(parseInt(req.params.id));
  res.json(product);
};
//calling create method for product table
const create = async (req: Request, res: Response) => {
  try {
    const product: product = {
      id: req.body.id,
      product_name: req.body.product_name,
      price: req.body.price,
    };
    const newProduct = await store.create(product);
    //create token for a method
    const privateKey: string | undefined = process.env.TOKEN_SECRET;
    jwt.verify(req.headers.token as string, privateKey as string);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//creating routes
const productRoutes = (app: express.Application) => {
  app.get("/product", index);
  app.get("/product/:id", show);
  app.post("/product", create);
};

export default productRoutes;
