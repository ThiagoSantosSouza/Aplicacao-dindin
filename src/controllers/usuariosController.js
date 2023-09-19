const {
    cadastrarUsuariosService,
    loginService,
    atualizarUsuarioService,
    detalharUsuarioService,
} = require('../services/usuariosService');
const pegaErro = require('../utils/lidaComErro');

const cadastrarUsuarioController = async (req, res) => {
    const { body } = req;

    try {
        const resultado = await cadastrarUsuariosService(body);
        return res.status(201).json(resultado);
    } catch (error) {
        return pegaErro(error, res);
    }
};

const loginController = async (req, res) => {
    try {
        const { body } = req;

        const permissaoUsuario = await loginService(body);

        return res.json(permissaoUsuario);
    } catch (error) {
        return pegaErro(error, res);
    }
};

const atualizarUsuarioController = async (req, res) => {
    try {
        const { body } = req;

        await atualizarUsuarioService(body);

        return res.status(204).json();
    } catch (error) {
        return pegaErro(error, res);
    }
};

const detalharUsuarioController = (req, res) => {
    try {
        const { body } = req;

        const result = detalharUsuarioService(body);

        return res.json(result);
    } catch (error) {
        pegaErro(error, res);
    }
};

module.exports = {
    cadastrarUsuarioController,
    loginController,
    atualizarUsuarioController,
    detalharUsuarioController,
};
