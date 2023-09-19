const ErrosPersonalizados = require('./ErrosPersonalizados');
const mensagem = require('./mensagem');

const pegaErro = (erro, res) => {
    if (erro instanceof ErrosPersonalizados) {
        return res.status(erro.status).json(mensagem(erro.message));
    }

    return res.status(400).json(mensagem(erro.message));
};

module.exports = pegaErro;
