const express = require('express');
const router = express.Router();

// Importa o Controller de Empréstimos
const emprestimoController = require('../controllers/emprestimoController');

// Rota para listar os empréstimos (GET)
router.get('/', emprestimoController.listar);

// Rota para exibir o formulário de novo empréstimo (GET)
router.get('/cadastrar', emprestimoController.exibirFormulario);

// Rota para processar o formulário de cadastro (POST)
router.post('/cadastrar', emprestimoController.cadastrar);

// Rota para processar a devolução (POST)
router.post('/devolver', emprestimoController.devolver);

module.exports = router;