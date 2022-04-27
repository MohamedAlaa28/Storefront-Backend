"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//create user class for the methods
class userStore {
    //create index method
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users ${err}`);
        }
    }
    //create show method
    async show(id) {
        try {
            const sql = "SELECT * FROM users WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get user ${id} ${err}`);
        }
    }
    //create create method
    async create(U) {
        try {
            const sql = "INSERT INTO users (first_name, last_name , password) VALUES($1, $2 ,$3) RETURNING *";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const saltRounds = process.env.SALT_ROUND;
            const pepper = process.env.BCRYPT_PASSWORD;
            const hash = bcrypt_1.default.hashSync(U.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [U.first_name, U.last_name, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add user ${U.first_name} ${err}`);
        }
    }
}
exports.userStore = userStore;
