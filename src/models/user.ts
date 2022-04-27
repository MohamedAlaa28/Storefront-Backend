// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";

//create user object for the input
export type user = {
  id?: number;
  first_name: string;
  last_name?: string;
  password: string;
};
//create user class for the methods
export class userStore {
  //create index method
  async index(): Promise<user[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users ${err}`);
    }
  }
  //create show method
  async show(id: number): Promise<user> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${id} ${err}`);
    }
  }
  //create create method
  async create(U: user): Promise<user> {
    try {
      const sql =
        "INSERT INTO users (first_name, last_name , password) VALUES($1, $2 ,$3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const saltRounds = process.env.SALT_ROUND;
      const pepper = process.env.BCRYPT_PASSWORD;
      const hash = bcrypt.hashSync(
        U.password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [U.first_name, U.last_name, hash]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add user ${U.first_name} ${err}`);
    }
  }
}
