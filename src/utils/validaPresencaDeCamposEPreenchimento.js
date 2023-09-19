const { verificaVariavelVazia } = require('./verificaVariavelVazia');

const validaPresencaDeCamposEPreenchimento = (
    chavesBuscadas = [],
    objetoRequisicao = {}
) => {
    const chavesObjetoRequisicao = Object.keys(objetoRequisicao);

    chavesBuscadas.map((chave) => {
        if (!chavesObjetoRequisicao.includes(chave)) {
            throw new Error(`Campo ${chave} não informado, favor informar.`);
        }
        if (verificaVariavelVazia(objetoRequisicao[chave])) {
            throw new Error(`Campo ${chave} deve estar preenchido.`);
        }
    });
};

module.exports = validaPresencaDeCamposEPreenchimento;
