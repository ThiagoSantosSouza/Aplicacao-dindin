const {
    buscarTodasCategoriasRepository,
} = require('../repositories/categoriasRepository');

const buscarTodasCategoriasService = async () => {
    return await buscarTodasCategoriasRepository();
};

module.exports = {
    buscarTodasCategoriasService,
};
