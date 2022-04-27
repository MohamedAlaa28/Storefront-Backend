# Storefront Backend Project

## Tech

this project contained server.ts which is the main file contained package.json where the dependencies and the devDependencies, and our scripts for what we will need, contained test src folder where the models and handlers and migrations folder where the syntax of creating the tables

## Features
this project working on creating three tables users, product, and orders for the storefront, creating models and handlers for with and making the password hashes for the users' table and return token for each of them

## Installation
Image Processing API requires [Node.js] to run

For project environments...

npm install 

## Database setup
for creating user...

CREATE USER postgres with encrypted password 'password123';

for creating testing database...

CREATE DATABASE frontstore_test;

for creating developing database...

CREATE DATABASE frontstore_dev;

for making all privileges to the user...

GRANT ALL PRIVILEGES ON DATABASE frontstore to postgres;

## server run
# server is running in port number 3000
for server... 

node run server

for tsc...

tsc

for watch...

node run watch

for jasmine test...

node run test

## Running
for buling the tables...

db-migrate up

for resting the tables...

db-migrate reset

for drop table...

db-migrate down

## Endpoints

app.get(`'/users', index`) => `http://localhost:3000/users`
app.get(`'/users/:id', show`) => `http://localhost:3000/users/:id`
app.post(`'/users', create`) => `http://localhost:3000/users`
app.get(`'/product', index`) => `http://localhost:3000/product`
app.get(`'/product/:id', show`) => `http://localhost:3000/product/:id`
app.post(`'/product', create`) => `http://localhost:3000/product`
app.get(`'/orders', index`) => `http://localhost:3000/orders`
app.get(`'/orders/:id', show`) => `http://localhost:3000/orders/:id`
app.post(`'/orders', create`) => `http://localhost:3000/orders`
app.post(`'/orders/:id/products', addProduct`) => `http://localhost:3000/orders/:id/products`
