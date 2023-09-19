const {
    buscarTransacoesRepository,
    buscarTransacaoPorIdRepository,
    cadastrarTransacaoRepository,
    atualizarTransacaoRepository,
    deletarTransacaoRepository,
    extratoTransacaoRepository,
    filtroTransacaoRepository,
} = require('../repositories/transacoesRepository');
const validaTransacaoPertenceAoUsuario = require('../utils/validaTransacaoPerteceAoUsuario');
const validaId = require('../utils/validaId');

const buscarTransacoesService = async (query, dados) => {
    const dadosQuery = Object.keys(query).length;

    if(!dadosQuery) {
        return await buscarTransacoesRepository(dados);
    }

    return await filtroTransacaoService(query, dados);
};

const buscarTransacaoPorIdService = async (parametros, body) => {
    const { id } = parametros;

    validaId(id);

    const resultado = await buscarTransacaoPorIdRepository(id, body.usuario);

    validaTransacaoPertenceAoUsuario(resultado);

    return resultado;
};

const cadastrarTransacaoService = async (dados) => {
    const resultado = await cadastrarTransacaoRepository(dados);

    return resultado;
};

const atualizarTransacaoService = async (parametros, dados) => {
    const resultado = await atualizarTransacaoRepository(parametros, dados);

    validaTransacaoPertenceAoUsuario(resultado);

    return;
};

const deletarTransacaoService = async (parametros, dados) => {
    const resultado = await deletarTransacaoRepository(parametros, dados);

    validaTransacaoPertenceAoUsuario(resultado);

    return;
};

const extratoTransacaoService = async (dados) => {
    const resultado = await extratoTransacaoRepository(dados);

    return resultado;
};

const filtroTransacaoService = async (query, dados) => {
    const { filtro } = query;
    
    return await filtroTransacaoRepository(filtro, dados);
};

module.exports = {
    buscarTransacoesService,
    buscarTransacaoPorIdService,
    cadastrarTransacaoService,
    atualizarTransacaoService,
    deletarTransacaoService,
    extratoTransacaoService,
    filtroTransacaoService,
};
