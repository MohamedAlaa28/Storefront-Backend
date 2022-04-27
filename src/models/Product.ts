// @ts-ignore
import Client from "../database";

//create product object for the input
export type product = {
  id?: number;
  product_name: string;
  price: number;
};
//create product class for the methods
export class productStore {
  //create index method
  async index(): Promise<product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM product;";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product ${err}`);
    }
  }
  //create show method
  async show(id: number): Promise<product> {
    try {
      const sql = "SELECT * FROM product WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product ${id}  ${err}`);
    }
  }
  //create create method
  async create(P: product): Promise<product> {
    try {
      const sql =
        "INSERT INTO product (product_name, price) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [P.product_name, P.price]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add product ${P.product_name}  ${err}`);
    }
  }
}
