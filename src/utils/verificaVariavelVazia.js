const verificaVariavelVazia = (variavel) => {
    if (typeof variavel == 'undefined') {
        throw new Error('Variável indefinida, favor definir.');
    }

    if (typeof variavel != 'string') {
        return false;
    }

    variavel = variavel.trim();

    if (!variavel.length) {
        return true;
    }

    return false;
};

module.exports = {
    verificaVariavelVazia,
};
