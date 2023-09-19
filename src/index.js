require('dotenv').config();
const express = require('express');
const rotas = require('./routes/rotas');
const app = express();

app.use(express.json());

app.use(rotas);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta: ${process.env.PORT}`);
});
