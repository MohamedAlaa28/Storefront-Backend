"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.userStore();
//calling index method for users table
const index = async (req, res) => {
    const users = await store.index();
    try {
        //create token for a method
        const privateKey = process.env.TOKEN_SECRET;
        jsonwebtoken_1.default.verify(req.headers.token, privateKey);
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
//calling show method for users table
const show = async (req, res) => {
    const user = await store.show(parseInt(req.params.id));
    try {
        //create token for a method
        const privateKey = process.env.TOKEN_SECRET;
        jsonwebtoken_1.default.verify(req.headers.token, privateKey);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
//calling create method for users table
const create = async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        };
        //create token for a method
        await store.create(user);
        const privateKey = process.env.TOKEN_SECRET;
        var token = jsonwebtoken_1.default.sign({ user: user }, privateKey);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
//creating routes
const usersRoutes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
};
exports.default = usersRoutes;
