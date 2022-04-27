"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new Product_1.productStore();
//calling index method for product table
const index = async (req, res) => {
    const products = await store.index();
    res.json(products);
};
//calling show method for product table
const show = async (req, res) => {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
};
//calling create method for product table
const create = async (req, res) => {
    try {
        const product = {
            id: req.body.id,
            product_name: req.body.product_name,
            price: req.body.price,
        };
        const newProduct = await store.create(product);
        //create token for a method
        const privateKey = process.env.TOKEN_SECRET;
        jsonwebtoken_1.default.verify(req.headers.token, privateKey);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
//creating routes
const productRoutes = (app) => {
    app.get("/product", index);
    app.get("/product/:id", show);
    app.post("/product", create);
};
exports.default = productRoutes;
