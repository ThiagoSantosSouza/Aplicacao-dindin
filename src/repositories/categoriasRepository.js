const conexaoBanco = require('../configs/conexao');

const buscarTodasCategoriasRepository = async () => {
    const buscarCategoriasQuery = `
      SELECT * FROM categorias
      ORDER BY id
    `;
    const resultado = await conexaoBanco.query(buscarCategoriasQuery);

    return resultado.rows;
};

const buscarCategoriaPorIdRepository = async (id) => {
    const buscarCategoriaPorIdQuery = `select * from categorias where id = $1`;

    const resultado = await conexaoBanco.query(buscarCategoriaPorIdQuery, [id]);

    return resultado.rows;
};

module.exports = {
    buscarTodasCategoriasRepository,
    buscarCategoriaPorIdRepository,
};
