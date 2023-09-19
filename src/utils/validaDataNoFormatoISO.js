const validarDataNoFormatoISO = (dataString) =>  {
    const data = new Date(dataString);

    if (isNaN(data.getTime())) {
        throw new Error(
            'Data em formato inválido. Formato aceito AAAA-MM-DDTHH:MM:SS.000Z onde .000 representam milissegundos.'
        );
    }
}

module.exports = validarDataNoFormatoISO;
