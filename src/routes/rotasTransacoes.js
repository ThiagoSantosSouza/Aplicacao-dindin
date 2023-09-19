const express = require('express');
const {
    buscarTransacoesController,
    buscarTransacaoPorIdController,
    cadastrarTransacaoController,
    atualizarTransacaoController,
    deletarTransacaoController,
    extratoTransacaoController,
} = require('../controllers/transacoesController');

const validacaoDadosPostEPutMiddleware = require('../middlewares/validacaoDadosPostEPutTransacaoMiddleware');

const rotasTransacoes = express.Router();

rotasTransacoes.get('/transacao', buscarTransacoesController);
rotasTransacoes.get('/transacao/extrato', extratoTransacaoController);
rotasTransacoes.get('/transacao/:id', buscarTransacaoPorIdController);
rotasTransacoes.post(
    '/transacao',
    validacaoDadosPostEPutMiddleware,
    cadastrarTransacaoController
);
rotasTransacoes.put(
    '/transacao/:id',
    validacaoDadosPostEPutMiddleware,
    atualizarTransacaoController
);
rotasTransacoes.delete('/transacao/:id', deletarTransacaoController);

module.exports = rotasTransacoes;
