# API Requirements

## settup
this project using `{typescript,nodemon,pg,jsonwebtoken,bcrypt,db-migrate,body-parser,dotenv}`

## run

npm run server

this project contained `{users,product,orders,order_products}` tables

1- users [id :PRIMARY KEY | first_name :VARCHAR| last_name :VARCHAR|password :text]
    [index]  
    app.get(`'/users', index`)
    `http://localhost:3000/users`
    [show]
    app.get(`'/users/:id', show`)
    `http://localhost:3000/users/:id`
    [create]
    app.post(`'/users', create`)
    `http://localhost:3000/users`
    {
        first_name: 'mohamed',
        last_name: 'alaa',
        password: 'password1234'
    }

2- producect [id :PRIMARY KEY| product_name :VARCHAR | price :integer]
    [index]
    app.get(`'/product', index`)
    `http://localhost:3000/product`
    [show]
    app.get(`'/product/:id', show`)
    `http://localhost:3000/product/:id`
    [create]
    app.post(`'/product', create`)
    `http://localhost:3000/product`
    {
        product_name: 'chesse',
        price: 20
    }

3- orders [id :PRIMARY KEY| customer_id :string foreign key| product_quantity :integer| order_status :VARCHAR]
    [index]
    app.get(`'/orders', index`)
    `http://localhost:3000/orders`
    [show]
    app.get(`'/orders/:id', show`)
    `http://localhost:3000/orders/:id`
    [create]
    app.post(`'/orders', create`)
    `http://localhost:3000/orders`
    {
        customer_id: '1',
        order_status: 'active',
        product_quantity : 1
    }
4- order_products [id :PRIMARY KEY| order_id :string foreign key| product_id :foreign key with string type| product_quantity :integer]
    [addProduct]
    app.post(`'/orders/:id/products', addProduct`)
    `http://localhost:3000/orders/:id/products`
    {
        product_id: '1',
        product_quantity: 10
    }
