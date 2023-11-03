require("@babel/register");
import 'dotenv/config';
require('dotenv').config();

require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"],
});
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { isEmpty, isNil } from 'lodash';

const { Sequelize } = require('sequelize');
import User from './models/User';
import Product from './models/Product';
import Purchase from './models/Purchase';
import PurchaseProducts from './models/PurchaseProducts';
import UsersController from './controllers/users';
import ProductsController from './controllers/products';
import { isValidBody } from './utils';
import { productModelAttributes } from './constants';
import AuthenticationController from './controllers/authentication';

const sequelizeInstance = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME,
  dialect: 'mariadb',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

const { APP_PORT } = process.env || 3000;
const { SECRET } = process.env

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

    // await sequelizeInstance.sync({ alter: true });
    await sequelizeInstance.authenticate();
    console.log('Connection has been established successfully.');


    const usersControllerInstance = new UsersController(UserModel);
    const productsControllerInstance = new ProductsController(ProductModel);
    const authenticationControllerInstance = new AuthenticationController(UserModel, SECRET);
    
    const products = await productsControllerInstance.getProducts();    
    
    app.get('/api/users', async (req, res) => {
      res.json(users);
    })

    app.post('/api/users', async (req, res) => {
      const { body, headers } = req;
      const loginResponse = await authenticationControllerInstance.verifyLogin(headers.authorization);

      if (!loginResponse.error && loginResponse.role === 'admin') {
        try {
          const createdUser = await usersControllerInstance.createUser({ ...body });
          res.status(201).json(createdUser);
        } catch (error) {
          console.error('***** errooooorrrr ******', error.name);
          res.status(422).send(error.name)
        }
      } else {
        res.status(403).json(loginResponse.error)
      }
      
    })

    app.get('/api/products', async (req, res) => {
      res.json(products);
    })

    app.post('/api/products', async (req, res) => {
      const { body } = req;
      const createdProduct = 
        await productsControllerInstance.createProduct({ ...body });

      res.status(201).json(createdProduct.dataValues);
    })

    app.patch('/api/product/:id', async (req, res) => {
      const { body, params } = req;

      if (isEmpty(body) || !isValidBody(body, productModelAttributes)) {
        res.status(400).send("Bad request");
    
      } else {

        const updatedproduct = 
          await productsControllerInstance.updateProduct(params.id, { ...body });

        res.status(200).json(updatedproduct.dataValues);

      }
      
    })

    app.delete('/api/product/:id', async (req, res) => {
      const { params } = req;
      const deletedProduct = await productsControllerInstance.deleteProduct(params.id);

      res.status(200).json(deletedProduct.dataValues);
    })

    app.post('/api/login', async (req, res) => {
      
      const { body } = req;
      
      const authenticationInfo = await authenticationControllerInstance.authenticate(body);

      if(!isNil(authenticationInfo)) {
        res.status(200).json(authenticationInfo);
      } else {
        res.status(401).send('Unauthorized');
      }

    })

    


    // const rawUser = {
    //   username: 'dimctesFromIndex.js',
    //   password: '123456',
    //   role: 'admin',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // };

      
    
    app.listen(APP_PORT, () => {
      console.log(`Listening on port ${APP_PORT}`)
    });
    


  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


