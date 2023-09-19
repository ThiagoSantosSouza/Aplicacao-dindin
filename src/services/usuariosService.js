const {
    validarEmailUnicoRepository,
    cadastrarUsuarioRepository,
    atualizarUsuarioRepository,
} = require('../repositories/usuariosRespository');

const ErrosPersonalizados = require('../utils/ErrosPersonalizados');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const senhaJwt = require('../configs/senhaJwt');

const {
    buscarTodasCategoriasRepository,
} = require('../repositories/categoriasRepository');

const validaEmail = require('../utils/validaEmail');

const confirmaUsuarioExiste = require('../utils/confirmaUsuarioExiste');

const criptografaSenha = require('../utils/criptografaSenha');

const validaPresencaDeCamposEPreenchimento = require('../utils/validaPresencaDeCamposEPreenchimento');

const cadastrarUsuariosService = async (dados) => {
    const { email, senha } = dados;

    validaPresencaDeCamposEPreenchimento(['email', 'senha', 'nome'], dados);

    validaEmail(email);

    const buscaEmail = await validarEmailUnicoService(email);

    const { rowCount } = buscaEmail;

    if (rowCount)
        throw new ErrosPersonalizados(
            'Ops! Já existe usuário cadastrado com o e-mail informado...',
            400
        );

    const hashSenha = await criptografaSenha(senha);

    dados.senha = hashSenha;

    const resultado = await cadastrarUsuarioRepository(dados);

    return resultado;
};

const validarEmailUnicoService = async (email) => {
    const resultado = await validarEmailUnicoRepository(email);
    return resultado;
};

const loginService = async (dados) => {
    
    validaPresencaDeCamposEPreenchimento(['email', 'senha'], dados);

    validaEmail(dados.email);

    const emailExiste = await validarEmailUnicoService(dados.email);

    const { rowCount } = emailExiste;

    if (!rowCount) {
        throw new ErrosPersonalizados('Usuário e/ou senha inválido(s).', 400);
    }

    const { email, senha, id, nome } = emailExiste.rows[0];

    const senhaBanco = await bcrypt.compare(dados.senha, senha);

    if (!senhaBanco) {
        throw new ErrosPersonalizados(
            'senha Usuário e/ou senha inválido(s).',
            400
        );
    }

    const token = jwt.sign({ id, email, nome }, senhaJwt, {
        expiresIn: '1d',
    });

    return {
        usuario: {
            id,
            nome,
            email,
        },
        token,
    };
};

const buscarUsuarioPorIdService = (id) => {
    const resultado = buscarTodasCategoriasRepository(id);
    return resultado;
};

const atualizarUsuarioService = async (dados) => {
    const { email, senha, usuario } = dados;

    const { id } = usuario;

    validaPresencaDeCamposEPreenchimento(['email', 'senha', 'nome'], dados);

    validaEmail(email);

    const buscaEmail = await validarEmailUnicoService(email);

    if (buscaEmail.rowCount) {
        const idUsuarioBanco = buscaEmail.rows[0].id;

        if (idUsuarioBanco != id)
            throw new ErrosPersonalizados(
                'Esse email não pode ser usado...',
                400
            );
    }

    confirmaUsuarioExiste(id);

    const novaSenhaCriptografada = await criptografaSenha(senha);

    dados.senha = novaSenhaCriptografada;

    await atualizarUsuarioRepository(dados, id);

    return;
};

const detalharUsuarioService = (dados) => {
    return dados.usuario;
};

module.exports = {
    cadastrarUsuariosService,
    validarEmailUnicoService,
    loginService,
    buscarUsuarioPorIdService,
    atualizarUsuarioService,
    detalharUsuarioService,
};
