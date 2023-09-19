const { isEmail } = require('validator');

module.exports = (email) => {
    if (!isEmail(email)) {
        throw new Error('Formato de email inválido.');
    }
};
