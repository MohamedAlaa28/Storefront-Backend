/* Replace with your SQL commands */


create table orders (
    id serial PRIMARY KEY,
    customer_id bigint REFERENCES users(id),
    order_status VARCHAR(100),
    product_quantity integer
);

