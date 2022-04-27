"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new orders_1.orderStore();
//calling index method for orders table
const index = async (req, res) => {
    try {
        const orders = await store.index();
        const privateKey = process.env.TOKEN_SECRET;
        jsonwebtoken_1.default.verify(req.headers.token, privateKey);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
//calling show method for orders table
const show = async (req, res) => {
    try {
        const order = await store.show(parseInt(req.params.id));
        const privateKey = process.env.TOKEN_SECRET;
        jsonwebtoken_1.default.verify(req.headers.token, privateKey);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
//calling create method for orders table
const create = async (req, res) => {
    try {
        const order = {
            id: req.body.id,
            customer_id: req.body.customer_id,
            order_status: req.body.order_status,
            product_quantity: req.body.product_quantity,
        };
        //create token for a method
        const privateKey = process.env.TOKEN_SECRET;
        jsonwebtoken_1.default.verify(req.headers.token, privateKey);
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
//calling the create of many to many table
const addProduct = async (req, res) => {
    try {
        const Product_order = {
            id: req.body.id,
            order_id: req.params.id,
            product_id: req.body.product_id,
            product_quantity: req.body.product_quantity,
        };
        const newProduct_order = await store.addProduct(Product_order);
        //create token for a method
        const privateKey = process.env.TOKEN_SECRET;
        jsonwebtoken_1.default.verify(req.headers.token, privateKey);
        const newOrder = await store.addProduct(Product_order);
        res.json(newProduct_order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
//creating routes
const ordersRoutes = (app) => {
    app.get("/orders", index);
    app.get("/orders/:id", show);
    app.post("/orders", create);
    app.post("/orders/:id/products", addProduct);
};
exports.default = ordersRoutes;
