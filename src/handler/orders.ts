import express, { application, Request, Response } from "express";
import { order, orderStore } from "../models/orders";
import jwt from "jsonwebtoken";

const store = new orderStore();

//calling index method for orders table
const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    const privateKey: string | undefined = process.env.TOKEN_SECRET;
    jwt.verify(req.headers.token as string, privateKey as string);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//calling show method for orders table
const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id));
    const privateKey: string | undefined = process.env.TOKEN_SECRET;
    jwt.verify(req.headers.token as string, privateKey as string);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//calling create method for orders table
const create = async (req: Request, res: Response) => {
  try {
    const order: order = {
      id: req.body.id,
      customer_id: req.body.customer_id,
      order_status: req.body.order_status,
      product_quantity: req.body.product_quantity,
    };
    //create token for a method
    const privateKey: string | undefined = process.env.TOKEN_SECRET;
    jwt.verify(req.headers.token as string, privateKey as string);
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//calling the create of many to many table
const addProduct = async (req: Request, res: Response) => {
  try {
    const Product_order: order = {
      id: req.body.id,
      order_id: req.params.id,
      product_id: req.body.product_id,
      product_quantity: req.body.product_quantity,
    };
    const newProduct_order = await store.addProduct(Product_order);
    //create token for a method
    const privateKey: string | undefined = process.env.TOKEN_SECRET;
    jwt.verify(req.headers.token as string, privateKey as string);
    const newOrder = await store.addProduct(Product_order);
    res.json(newProduct_order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//creating routes
const ordersRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
  app.post("/orders/:id/products", addProduct);
};

export default ordersRoutes;
