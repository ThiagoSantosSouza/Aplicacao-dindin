const jwt = require('jsonwebtoken');
const senhaJwt = require('../configs/senhaJwt');
const pegaErro = require('../utils/lidaComErro');
const ErrosPersonalizados = require('../utils/ErrosPersonalizados');
const { verificaVariavelVazia } = require('../utils/verificaVariavelVazia');
const {
    validarEmailUnicoRepository,
} = require('../repositories/usuariosRespository');

const validaAutenticacao = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (verificaVariavelVazia(authorization)) {
            throw new ErrosPersonalizados(
                'Faça Login para acessar esse recurso.',
                401
            );
        }

        const token = authorization.replace(/(Bearer\s)|(Bearer)/, '').trim();

       
        if (verificaVariavelVazia(token)) {
            throw new ErrosPersonalizados(
                'Faça Login para acessar esse recurso.',
                401
            );
        }
        
        const dadosUsuario = jwt.verify(token, senhaJwt);

        const { email, nome, id } = dadosUsuario;

        req.body.usuario = { id, nome, email };

        const validaSeEmailExiste = await validarEmailUnicoRepository(email);

        if (!validaSeEmailExiste.rowCount) {
            throw new ErrosPersonalizados(
                'Favor fazer novo login, possívelmente esse usuário passou por uma atualização de email.',
                401
            );
        }

        return next();
    } catch (error) {
        return pegaErro(error, res);
    }
};

module.exports = {
    validaAutenticacao,
};
