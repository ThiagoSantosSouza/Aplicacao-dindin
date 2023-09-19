const {
    buscarTransacoesService,
    buscarTransacaoPorIdService,
    cadastrarTransacaoService,
    atualizarTransacaoService,
    deletarTransacaoService,
    extratoTransacaoService,
    filtroTransacaoService,
} = require('../services/transacoesService');
const pegaErro = require('../utils/lidaComErro');

const buscarTransacoesController = async (req, res) => {
    try {
        const { body, query } = req;

        const resultado = await buscarTransacoesService(query, body.usuario);

        return res.json(resultado);
    } catch (error) {
        return pegaErro(error, res);
    }
};

const buscarTransacaoPorIdController = async (req, res) => {
    try {
        const { params, body } = req;

        const resultado = await buscarTransacaoPorIdService(params, body);

        return res.json(resultado[0]);
    } catch (error) {
        return pegaErro(error, res);
    }
};

const cadastrarTransacaoController = async (req, res) => {
    try {
        const { body } = req;

        const resultado = await cadastrarTransacaoService(body);

        return res.status(201).json(resultado);
    } catch (error) {
        return pegaErro(error, res);
    }
};

const atualizarTransacaoController = async (req, res) => {
    try {
        const { body } = req;

        await atualizarTransacaoService(req.params, body);

        return res.status(204).json();
    } catch (error) {
        return pegaErro(error, res);
    }
};

const deletarTransacaoController = async (req, res) => {
    try {
        const { body } = req;

        await deletarTransacaoService(req.params, body);

        return res.status(204).json();
    } catch (error) {
        return pegaErro(error, res);
    }
};

const extratoTransacaoController = async (req, res) => {
    try {
        const { body } = req;

        const resultado = await extratoTransacaoService(body.usuario);

        return res.json(resultado);
    } catch (error) {
        return pegaErro(error, res);
    }
};

module.exports = {
    buscarTransacoesController,
    buscarTransacaoPorIdController,
    cadastrarTransacaoController,
    atualizarTransacaoController,
    deletarTransacaoController,
    extratoTransacaoController,
};
