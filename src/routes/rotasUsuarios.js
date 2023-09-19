const express = require('express');
const rotasUsuarios = express.Router();

const {
    cadastrarUsuarioController,
    loginController,
    atualizarUsuarioController,
    detalharUsuarioController,
} = require('../controllers/usuariosController');
const { validaAutenticacao } = require('../middlewares/autenticacaoMiddleware');

rotasUsuarios.post('/usuario', cadastrarUsuarioController);
rotasUsuarios.post('/login', loginController);

rotasUsuarios.use(validaAutenticacao);

rotasUsuarios.put('/usuario', atualizarUsuarioController);
rotasUsuarios.get('/usuario', detalharUsuarioController);


module.exports = rotasUsuarios;
