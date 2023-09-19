const {
    buscarTodasCategoriasService,
} = require('../services/CategoriasService');
const pegaErro = require('../utils/lidaComErro');

const obterCategoriasController = async (req, res) => {
    try {
        const resultado = await buscarTodasCategoriasService();

        return res.status(200).json(resultado);
    } catch (error) {
        return pegaErro(error, res);
    }
};

module.exports = {
    obterCategoriasController,
};
