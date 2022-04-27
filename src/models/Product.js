"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
//create product class for the methods
class productStore {
    //create index method
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM product;";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get product ${err}`);
        }
    }
    //create show method
    async show(id) {
        try {
            const sql = "SELECT * FROM product WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get product ${id}  ${err}`);
        }
    }
    //create create method
    async create(P) {
        try {
            const sql = "INSERT INTO product (product_name, price) VALUES($1, $2) RETURNING *";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [P.product_name, P.price]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add product ${P.product_name}  ${err}`);
        }
    }
}
exports.productStore = productStore;
