const {
    buscarUsuarioPorIdRepository,
} = require('../repositories/usuariosRespository');
const ErrosPersonalizados = require('./ErrosPersonalizados');

const confirmaUsuarioExiste = async (id) => {
    const usuarioExiste = await buscarUsuarioPorIdRepository(id);

    const { rowCount } = usuarioExiste;

    if (!rowCount) {
        throw new ErrosPersonalizados('Usuário não encontrado.', 400);
    }
};

module.exports = confirmaUsuarioExiste;
