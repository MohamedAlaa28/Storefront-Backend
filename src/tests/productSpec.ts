import { product, productStore } from "../models/Product";
import path from "path";
import supertest from "supertest";
import app from "../server";
import jwt from "jsonwebtoken";
import sinon from "sinon";
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const request = supertest(app);
const store = new productStore();

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
  let stub: sinon.SinonStub<
    [
      token: string,
      secretOrPublicKey: jwt.Secret | jwt.GetPublicKeyOrSecret,
      options?: jwt.VerifyOptions | undefined,
      callback?: jwt.VerifyCallback<jwt.JwtPayload> | undefined
    ],
    void
  >;
  beforeAll(() => {
    stub = sinon.stub(jwt, "verify").callsFake(() => {
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
    jwt.verify(token, secret);

    const response = await request.post("/product");
    expect(response.status).toBe(200);
  });
});
