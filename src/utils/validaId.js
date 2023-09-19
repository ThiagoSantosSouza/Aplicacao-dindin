const { isNumeric } = require('validator');
module.exports = (id) => {
    if (!isNumeric(id.toString())) {
        throw new Error(
            'Favor, digite um caractere numérico válido no campo id.'
        );
    }
    return;
};
