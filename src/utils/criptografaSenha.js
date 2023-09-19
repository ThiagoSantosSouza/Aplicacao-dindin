const bcrypt = require('bcrypt');

const criptografaSenha = async (senha) => {
    return await bcrypt.hash(senha, 10);
};

module.exports = criptografaSenha;