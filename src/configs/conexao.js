require('dotenv').config();

const { Pool } = require('pg');

const conexaoBanco = new Pool({
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.DATABASE,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB
});

module.exports = conexaoBanco;