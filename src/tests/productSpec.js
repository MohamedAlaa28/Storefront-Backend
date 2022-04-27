"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sinon_1 = __importDefault(require("sinon"));
require("dotenv").config({ path: path_1.default.resolve(__dirname, "../../../.env") });
const request = (0, supertest_1.default)(server_1.default);
const store = new Product_1.productStore();
describe("products model", () => {
    //testing index method in product table
    it("index method should returen a list products", async () => {
        const products = await store.index();
        expect(products).toEqual([]);
    });
    //testing create method in product table
    it("create method should add a product", async () => {
        const product = await store.create({
            product_name: "chesse",
            price: 20,
        });
        expect(product).toEqual({
            id: 1,
            product_name: "chesse",
            price: 20,
        });
    });
    //testing show method in product table
    it("show method should returen a spacific product", async () => {
        const product = await store.show(1);
        expect(product).toEqual({
            id: 1,
            product_name: "chesse",
            price: 20,
        });
    });
});
// test the response of product endpoint
describe("the end point work sucessfully with product", () => {
    //testing of get endpoint
    let stub;
    beforeAll(() => {
        stub = sinon_1.default.stub(jsonwebtoken_1.default, "verify").callsFake(() => {
            return Promise.resolve({ success: "Token is valid" });
        });
    });
    afterAll(() => {
        stub.restore();
    });
    it("check the stauts of get endpoint", async () => {
        const response = await request.get("/product");
        expect(response.status).toBe(200);
    });
    //testing of post endpoint
    it("check the stauts of post endpoint", async () => {
        const token = "token";
        const secret = "token secret";
        jsonwebtoken_1.default.verify(token, secret);
        const response = await request.post("/product");
        expect(response.status).toBe(200);
    });
});
