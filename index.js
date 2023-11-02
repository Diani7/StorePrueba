const express = require('express');
require('dotenv').config()

const { PORT } = process.env;

const app = express();
const port = PORT || 3000;

app.get('/', (req, res) => {
  res.send("Hello Store")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

