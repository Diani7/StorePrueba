/**
 * @fileoverview Archivo de inicio para la API de inventario. Configura el servidor Express,
 * la conexión a la base de datos con Sequelize, y establece las rutas de la API.
 */
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

// Configuración de la instancia de Sequelize para la conexión a la base de datos.
const sequelizeInstance = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME,
  dialect: 'mariadb',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});
// Configuración del puerto de la aplicación y la clave secreta para JWT.
const { APP_PORT } = process.env || 3000;
const { SECRET } = process.env
// Inicialización de la aplicación Express y configuración de middleware.
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
/**
 * Función autoinvocada para configurar y sincronizar la base de datos y el servidor.
 */
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
    // Autenticación con la base de datos.
    await sequelizeInstance.authenticate();
    console.log('Connection has been established successfully.');

    // Instancias de los controladores con sus respectivos modelos.
    const usersControllerInstance = new UsersController(UserModel);
    const productsControllerInstance = new ProductsController(ProductModel);
    const authenticationControllerInstance = new AuthenticationController(UserModel, SECRET);
    
    const products = await productsControllerInstance.getProducts();    

    // Definición de rutas de la API y sus controladores.
    // Aquí se establecen las rutas para la gestión de usuarios, productos y autenticación.
    // Se utilizan los métodos de los controladores para responder a las solicitudes HTTP.
    /**
     * @route GET /api/users
     * @desc Obtiene todos los usuarios registrados.
     * @access Admin
   */  
    app.get('/api/users', async (req, res) => {
      res.json(users);
    })
    /**
     * @route POST /api/users
     * @desc Registra un nuevo usuario en el sistema.
     * @access Admin
   */
    app.post('/api/users', async (req, res) => {
      const { body, headers } = req;
      const loginResponse = await authenticationControllerInstance.verifyLogin(headers.authorization);

      if (!loginResponse.error && loginResponse.role === 'admin') {
        try {
          const createdUser = await usersControllerInstance.createUser({ ...body });
          res.status(201).json(createdUser);
        } catch (error) {
          console.error('***** errooooorrrr DB******', error.name);
          res.status(422).send(error.name)
        }
      } else {
        console.log('403 loginResponse', loginResponse)
        const errorResponse = loginResponse.error || 'Rol no autorizado';
        res.status(403).json(errorResponse)
      }
      
    })
    /**
     * @route GET /api/products
     * @desc Obtiene todos los productos disponibles en el inventario.
     * @access Public
   */
    app.get('/api/products', async (req, res) => {
      res.json(products);
    })
    /**
     * @route POST /api/products
     * @desc Crea un nuevo producto en el inventario.
     * @access Admin
     */
    app.post('/api/products', async (req, res) => {
      const { body, headers } = req;
      const loginResponse = await authenticationControllerInstance.verifyLogin(headers.authorization);

      if (!loginResponse.error && loginResponse.role === 'admin') {
        try {
          const createdProduct = await productsControllerInstance.createProduct({ ...body });
          res.status(201).json(createdProduct.dataValues);
        } catch (error) {
          console.error('***** errooooorrrr DB******', error.name);
          res.status(422).send(error.name)
        }
      } else {
        console.log('403 loginResponse', loginResponse)
        const errorResponse = loginResponse.error || 'Rol no autorizado';
        res.status(403).json(errorResponse)
      }
    });
    /**
     * @route PATCH /api/product/:id
     * @desc Actualiza la información de un producto existente.
     * @param id - El ID del producto a actualizar.
     * @access Admin
    */
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
    /**
   * @route DELETE /api/product/:id
   * @desc Elimina un producto del inventario.
   * @param id - El ID del producto a eliminar.
   * @access Admin
   */
    app.delete('/api/product/:id', async (req, res) => {
      const { params } = req;
      const deletedProduct = await productsControllerInstance.deleteProduct(params.id);

      res.status(200).json(deletedProduct.dataValues);
    })
    /**
   * @route POST /api/login
   * @desc Autentica a un usuario y devuelve un token JWT.
   * @access Public
   */
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


