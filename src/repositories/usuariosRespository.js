const conexaoBanco = require('../configs/conexao');

const validarEmailUnicoRepository = async (email) => {
    const buscaEmailQuery = 'SELECT * FROM usuarios WHERE email = $1 LIMIT 1';
    const emailUnico = await conexaoBanco.query(buscaEmailQuery, [email]);

    return emailUnico;
};

const cadastrarUsuarioRepository = async (dados) => {
    const { email, nome, senha } = dados;

    const cadastrarUsuarioQuery =
        'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning id, nome, email';

    const novoUsuario = await conexaoBanco.query(cadastrarUsuarioQuery, [
        nome,
        email,
        senha,
    ]);

    return novoUsuario.rows[0];
};

const buscarUsuarioPorIdRepository = async (id) => {
    const buscarUsuarioIdQuery = `
        select count(*) from usuarios where id = $1
    `;
    const resultado = await conexaoBanco.query(buscarUsuarioIdQuery, [id]);

    return resultado;
};

const atualizarUsuarioRepository = async (dados, id) => {
    const { nome, email, senha } = dados;
    const atualizarUsuarioQuery = `
        update usuarios set nome = $1, senha = $2, email = $3 where id = $4 returning *
    `;
    const resultado = await conexaoBanco.query(atualizarUsuarioQuery, [
        nome,
        senha,
        email,
        id,
    ]);

    return resultado;
};

module.exports = {
    validarEmailUnicoRepository,
    cadastrarUsuarioRepository,
    buscarUsuarioPorIdRepository,
    atualizarUsuarioRepository,
};
