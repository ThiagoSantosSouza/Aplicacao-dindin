class ErrosPersonalizados extends Error {
    constructor(mensagem, status) {
        super(mensagem);
        this.status = status;
        this.name = this.constructor.name;
    }
}
module.exports = ErrosPersonalizados;
