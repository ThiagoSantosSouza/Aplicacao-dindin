module.exports = (resultado) => {
    if (!resultado.length) {
        throw new Error(
            'Essa transação não pertence a esse usuário, favor, informe o id de uma transação pertencente a este usuário.'
        );
    }
    return;
};
