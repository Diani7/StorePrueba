require("@babel/register");
import 'dotenv/config';
require('dotenv').config();

require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"],
});
// const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const { Sequelize } = require('sequelize');
import User from './models/User';
import Product from './models/Product';
import Purchase from './models/Purchase';
import PurchaseProducts from './models/PurchaseProducts';

const sequelizeInstance = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME,
  dialect: 'mariadb',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

const { APP_PORT } = process.env || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

(async () => {
  try {
    const UserModel = User(sequelizeInstance);
    const ProductModel = Product(sequelizeInstance);
    const PurchaseModel = Purchase(sequelizeInstance, UserModel);
    
    const PurchaseProductsModel = PurchaseProducts(
      sequelizeInstance, 
      PurchaseModel, 
      ProductModel
    );
    
    PurchaseModel.belongsToMany(ProductModel, { through: PurchaseProductsModel });
    ProductModel.belongsToMany(PurchaseModel, { through: PurchaseProductsModel });

    // await sequelizeInstance.sync({ force: true });
    await sequelizeInstance.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();



app.get('/', (req, res) => {
  res.send("Hello Store")
})

app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`)
});

