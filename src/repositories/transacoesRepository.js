const conexaoBanco = require('../configs/conexao');

const buscarTransacoesRepository = async (dados) => {
    const { id } = dados;
    const buscarTransacoesPorIdUsuarioQuery = `
        select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome
        from transacoes t inner join categorias c on c.id = t.categoria_id
        where t.usuario_id = $1;
    `;

    const resultado = await conexaoBanco.query(
        buscarTransacoesPorIdUsuarioQuery,
        [id]
    );

    return resultado.rows;
};

const buscarTransacaoPorIdRepository = async (id_transacao, dadosUsuario) => {
    const { id } = dadosUsuario;

    const buscarTransacoesPorIdTransacaoQuery = `
        select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome
        from transacoes t inner join categorias c on c.id = t.categoria_id
        where t.usuario_id = $1 and t.id = $2;
    `;

    const resultado = await conexaoBanco.query(
        buscarTransacoesPorIdTransacaoQuery,
        [id, id_transacao]
    );

    return resultado.rows;
};

const cadastrarTransacaoRepository = async (dados) => {
    const { descricao, valor, data, categoria_id, tipo, usuario } = dados;

    const { id } = usuario;

    const cadastrarTransacaoQuery = `insert into transacoes(descricao, valor, data, categoria_id, tipo, usuario_id) values ($1, $2, $3, $4, $5, $6) returning id`;

    const resultadoInsercaoNovaTransacao = await conexaoBanco.query(
        cadastrarTransacaoQuery,
        [descricao, valor, data, categoria_id, tipo, id]
    );

    const { rows } = resultadoInsercaoNovaTransacao;

    const resultado = await buscarTransacaoPorIdRepository(rows[0].id, usuario);

    return resultado;
};

const atualizarTransacaoRepository = async (parametros, dados) => {
    const { descricao, valor, data, categoria_id, tipo, usuario } = dados;

    const idUsuario = usuario.id;

    const idCategoria = parametros.id;

    const cadastrarTransacaoQuery = `update transacoes set descricao = $1 , valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6 and usuario_id = $7 returning *`;

    const resultado = await conexaoBanco.query(cadastrarTransacaoQuery, [
        descricao,
        valor,
        data,
        categoria_id,
        tipo,
        idCategoria,
        idUsuario,
    ]);

    return resultado.rows;
};

const deletarTransacaoRepository = async (parametros, dados) => {
    const { id } = parametros;

    const { usuario } = dados;

    const deleteTransacaoQuery = `
        delete from transacoes where id = $1 and usuario_id = $2 returning *
    `;

    const resultado = await conexaoBanco.query(deleteTransacaoQuery, [
        id,
        usuario.id,
    ]);

    return resultado.rows;
};

const extratoTransacaoRepository = async (dados) => {
    const { id } = dados;
    const extratoTransacoesUsuarioQuery = `
    select 
        coalesce(sum(case when tipo = 'entrada' then valor else 0 end), 0) as entrada,
        coalesce(sum(case when tipo = 'saida' then valor else 0 end), 0) as saida
    from transacoes
    where usuario_id = $1
    `;

    const resultado = await conexaoBanco.query(extratoTransacoesUsuarioQuery, [
        id,
    ]);

    return resultado.rows[0];
};

const filtroTransacaoRepository = async (filtro, dados) => {
    const { id } = dados;

    const filtroPorCategoriasQuery = `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome from transacoes t inner join categorias c on c.id = t.categoria_id where t.usuario_id = $1 and c.descricao Ilike any($2)`;

    const resultado = await conexaoBanco.query(filtroPorCategoriasQuery, [
        id,
        filtro,
    ]);

    return resultado.rows;
};

module.exports = {
    buscarTransacoesRepository,
    buscarTransacaoPorIdRepository,
    cadastrarTransacaoRepository,
    atualizarTransacaoRepository,
    deletarTransacaoRepository,
    extratoTransacaoRepository,
    filtroTransacaoRepository,
};
