const express = require('express');
const { obterCategoriasController } = require('../controllers/categoriasController');
const { validaAutenticacao } = require('../middlewares/autenticacaoMiddleware');
const rotasCategorias = express.Router();

rotasCategorias.use(validaAutenticacao);
rotasCategorias.get('/categoria', obterCategoriasController);


module.exports = rotasCategorias;