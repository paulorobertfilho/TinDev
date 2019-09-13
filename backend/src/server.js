const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

const PORT = process.env.PORT || 3333;

mongoose
  .connect("mongodb+srv://adminbox:adminbox@cluster0-jxsc8.mongodb.net/tindev?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

server.use(cors());
server.use(express.json());
server.use(routes);


server.listen(PORT, function () {
  console.log('Executando sobre a Porta: ' + PORT);
});
