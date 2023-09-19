const express = require('express');
const rotas = express.Router();

const rotasUsuarios = require('./rotasUsuarios');
rotas.use(rotasUsuarios);

const rotasCategorias = require('./rotasCategorias');
rotas.use(rotasCategorias);

const rotasTransacoes = require('./rotasTransacoes');
rotas.use(rotasTransacoes);

module.exports = rotas;
