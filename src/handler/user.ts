import express, { Request, Response } from "express";
import { user, userStore } from "../models/user";
import jwt from "jsonwebtoken";

const store = new userStore();
//calling index method for users table
const index = async (req: Request, res: Response) => {
  const users = await store.index();
  try {
    //create token for a method
    const privateKey: string | undefined = process.env.TOKEN_SECRET;
    jwt.verify(req.headers.token as string, privateKey as string);
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//calling show method for users table
const show = async (req: Request, res: Response) => {
  const user = await store.show(parseInt(req.params.id));
  try {
    //create token for a method
    const privateKey: string | undefined = process.env.TOKEN_SECRET;
    jwt.verify(req.headers.token as string, privateKey as string);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//calling create method for users table
const create = async (req: Request, res: Response) => {
  try {
    const user: user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    //create token for a method
    await store.create(user);
    const privateKey: string | undefined = process.env.TOKEN_SECRET;
    var token = jwt.sign({ user: user }, privateKey as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//creating routes
const usersRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
};

export default usersRoutes;
