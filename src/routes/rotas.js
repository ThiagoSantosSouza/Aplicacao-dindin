const express = require('express');
const rotas = express.Router();

rotas.get('/', (req, res) => {
    res.send(
        'Olá, seja bem-vindo a aplicação dindin, aqui você poderá organizar suas finanças pessoais.'
    );
});

const rotasUsuarios = require('./rotasUsuarios');
rotas.use(rotasUsuarios);

const rotasCategorias = require('./rotasCategorias');
rotas.use(rotasCategorias);

const rotasTransacoes = require('./rotasTransacoes');
rotas.use(rotasTransacoes);

module.exports = rotas;
