const pegaErro = require('../utils/lidaComErro');
const validaPresencaDeCamposEPreenchimento = require('../utils/validaPresencaDeCamposEPreenchimento');

<<<<<<< HEAD
const validarDataNoFormatoISO = require('../utils/validaDataNoFormatoISO');
=======
const validarDataNoFormatoISO = require('../utils/ValidaDataNoFormatoISO.js');
>>>>>>> 9377716d8b7862a634713f2431a9cd88ed3ab702

const {
    buscarCategoriaPorIdRepository,
} = require('../repositories/categoriasRepository');
const validaId = require('../utils/validaId');

const validacaoDadosPostEPutMiddleware = async (req, res, next) => {
    try {
        const { usuario, ...body } = req.body;

        const { tipo, categoria_id, data } = body;

        validaId(categoria_id);

        validaPresencaDeCamposEPreenchimento(
            ['descricao', 'valor', 'data', 'categoria_id', 'tipo'],
            body
        );

        const operacaoDoCampoTipoPermitidas = ['entrada', 'saida'];

        if (!operacaoDoCampoTipoPermitidas.includes(tipo)) {
            throw new Error(
                'Tipo de transação não permitida, o campo tipo só aceita os seguintes valores: entrada, saida'
            );
        }

        validarDataNoFormatoISO(data);

        const validaSeIdDaCategoriaExiste =
            await buscarCategoriaPorIdRepository(categoria_id);

        if (!validaSeIdDaCategoriaExiste.length) {
            throw new Error(
                'Id categoria inexistente, favor passe um id cadastrado.'
            );
        }
        return next();
    } catch (error) {
        pegaErro(error, res);
    }
};

module.exports = validacaoDadosPostEPutMiddleware;
