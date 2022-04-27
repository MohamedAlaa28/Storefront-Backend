"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const orders_1 = require("../models/orders");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sinon_1 = __importDefault(require("sinon"));
require("dotenv").config({ path: path_1.default.resolve(__dirname, "../../../.env") });
const request = (0, supertest_1.default)(server_1.default);
const store = new user_1.userStore();
const storeOrder = new orders_1.orderStore();
describe("users model", () => {
    //testing index method in users table
    it("index method should returen a list users", async () => {
        const users = await store.index();
        expect(users).toEqual([]);
    });
    //testing create method in users table
    it("create method should add a user", async () => {
        const user = await store.create({
            first_name: "mohamed",
            last_name: "alaa",
            password: "1234",
        });
        expect(user).not.toBeNull;
    });
    //testing show method in users table and make it atleast to print what is created
    it("show method should returen a spacific user", async () => {
        const user = await store.show(1);
        expect(user).not.toBeNull;
    });
});
// will test order here after users and product tables are created because we need their ids in the orders table
describe("orders model", () => {
    //testing create method in orders table
    it("create method should add a order", async () => {
        const order = await storeOrder.create({
            customer_id: "1",
            order_status: "active",
            product_quantity: 1,
        });
        expect(order).toEqual({
            id: 1,
            customer_id: "1",
            order_status: "active",
            product_quantity: 1,
        });
    });
    //testing show method in orders table
    it("show method should returen a spacific order", async () => {
        const order = await storeOrder.show(1);
        expect(order).not.toBeNull;
    });
    //testing many to many realtion method in order_products table
    it("addProduct method should add relation between orders and products", async () => {
        const order_products = await storeOrder.addProduct({
            order_id: "1",
            product_id: "1",
            product_quantity: 10,
        });
        expect(order_products).toEqual({
            id: 1,
            order_id: "1",
            product_id: "1",
            product_quantity: 10,
        });
    });
});
// test the response of users endpoint
describe("the end point work sucessfully with users", () => {
    let stub;
    beforeAll(() => {
        stub = sinon_1.default.stub(jsonwebtoken_1.default, "verify").callsFake(() => {
            return Promise.resolve({ success: "Token is valid" });
        });
    });
    afterAll(() => {
        stub.restore();
    });
    //testing of post endpoint
    it("check the stauts of post endpoint", async () => {
        const response = await request.post("/users");
        expect(response.status).toBe(200);
    });
    //testing of get endpoint
    it("check the stauts of get endpoint", async () => {
        const token = "token";
        const secret = "token secret";
        jsonwebtoken_1.default.verify(token, secret);
        const response = await request.get("/users");
        expect(response.status).toBe(200);
    });
});
// test the response of orders endpoint
// i didn't test post endpoint because it protected by tokens
describe("the end point work sucessfully with orders", () => {
    let stub;
    beforeAll(() => {
        stub = sinon_1.default.stub(jsonwebtoken_1.default, "verify").callsFake(() => {
            return Promise.resolve({ success: "Token is valid" });
        });
    });
    afterAll(() => {
        stub.restore();
    });
    //testing of post endpoint
    it("check the stauts of post endpoint", async () => {
        const token = "token";
        const secret = "token secret";
        jsonwebtoken_1.default.verify(token, secret);
        const response = await request.post("/orders");
        expect(response.status).toBe(200);
    });
    //testing of get endpoint
    it("check the stauts of get endpoint", async () => {
        const response = await request.get("/orders");
        expect(response.status).toBe(200);
    });
});
