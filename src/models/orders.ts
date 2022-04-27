// @ts-ignore
import Client from "../database";

//create orders object for the input
export type order = {
  id?: number;
  customer_id?: string;
  product_id?: string;
  order_id?: string;
  order_status?: string;
  product_quantity?: number;
};

//create orders class for the methods
export class orderStore {
  //create index method
  async index(): Promise<order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders;";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders${err}`);
    }
  }
  //create show method
  async show(id: number): Promise<order> {
    try {
      const sql =
        "SELECT * FROM orders INNER JOIN order_products ON order_id = $1 ;";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order ${id} ${err}`);
    }
  }
  //create create method
  async create(O: order): Promise<order> {
    try {
      const sql =
        "INSERT INTO orders (customer_id, order_status , product_quantity) VALUES($1, $2 ,$3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        O.customer_id,
        O.order_status,
        O.product_quantity,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add order ${O.id} ${err}`);
    }
  }
  //create a creating to many to many relation
  async addProduct(O: order): Promise<order> {
    try {
      const sql =
        "INSERT INTO order_products (order_id, product_id, product_quantity) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        O.order_id,
        O.product_id,
        O.product_quantity,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${O.product_id} to order ${O.order_id}: ${err}`
      );
    }
  }
}
