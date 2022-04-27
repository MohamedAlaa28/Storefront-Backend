import { user, userStore } from "../models/user";
import { order, orderStore } from "../models/orders";
import supertest from "supertest";
import app from "../server";
import path from "path";
import jwt from "jsonwebtoken";
import sinon from "sinon";
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const request = supertest(app);
const store = new userStore();
const storeOrder = new orderStore();

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
  //testing of post endpoint
  it("check the stauts of post endpoint", async () => {
    const response = await request.post("/users");
    expect(response.status).toBe(200);
  });
  //testing of get endpoint
  it("check the stauts of get endpoint", async () => {
    const token = "token";
    const secret = "token secret";
    jwt.verify(token, secret);

    const response = await request.get("/users");
    expect(response.status).toBe(200);
  });
});
// test the response of orders endpoint
// i didn't test post endpoint because it protected by tokens
describe("the end point work sucessfully with orders", () => {
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
  //testing of post endpoint
  it("check the stauts of post endpoint", async () => {
    const token = "token";
    const secret = "token secret";
    jwt.verify(token, secret);

    const response = await request.post("/orders");
    expect(response.status).toBe(200);
  });
  //testing of get endpoint
  it("check the stauts of get endpoint", async () => {
    const response = await request.get("/orders");
    expect(response.status).toBe(200);
  });
});
