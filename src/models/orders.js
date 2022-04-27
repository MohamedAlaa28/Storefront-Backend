"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
//create orders class for the methods
class orderStore {
    //create index method
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders;";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders${err}`);
        }
    }
    //create show method
    async show(id) {
        try {
            const sql = "SELECT * FROM orders INNER JOIN order_products ON order_id = $1 ;";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get order ${id} ${err}`);
        }
    }
    //create create method
    async create(O) {
        try {
            const sql = "INSERT INTO orders (customer_id, order_status , product_quantity) VALUES($1, $2 ,$3) RETURNING *";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                O.customer_id,
                O.order_status,
                O.product_quantity,
            ]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add order ${O.id} ${err}`);
        }
    }
    //create a creating to many to many relation
    async addProduct(O) {
        try {
            const sql = "INSERT INTO order_products (order_id, product_id, product_quantity) VALUES($1, $2, $3) RETURNING *";
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                O.order_id,
                O.product_id,
                O.product_quantity,
            ]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${O.product_id} to order ${O.order_id}: ${err}`);
        }
    }
}
exports.orderStore = orderStore;
