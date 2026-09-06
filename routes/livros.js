const express = require('express');
const router = express.Router();

// Importa o controller correspondente
const livroController = require('../controllers/livroController');

// Mapeia a URL raiz '/' desta rota para a ação listar
router.get('/', livroController.listar);

// Rota para exibir o formulário de cadastro (GET)
router.get('/cadastrar', livroController.exibirFormulario);

// Rota para receber os dados do formulário e salvar (POST)
router.post('/cadastrar', livroController.cadastrar);

module.exports = router;