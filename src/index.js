import 'dotenv/config';
require('dotenv').config();

require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"],
});
// const express = require('express');
import express from 'express';
import sequelizeInstance from './dbConfig';

const { APP_PORT } = process.env || 3000;

const app = express();

(async () => {
  try {
    await sequelizeInstance.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()



app.get('/', (req, res) => {
  res.send("Hello Store")
})

app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`)
});

