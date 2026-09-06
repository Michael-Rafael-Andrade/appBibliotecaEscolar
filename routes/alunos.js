const express = require('express');
const router = express.Router();

// Importa o controller de Aluno
const alunoController = require('../controllers/alunoController');

// Rota para listar alunos (GET)
router.get('/', alunoController.listar);

// Rota para exibir formulário (GET)
router.get('/cadastrar', alunoController.exibirFormulario);

// Rota para processar o cadastro (POST)
router.post('/cadastrar', alunoController.cadastrar);

module.exports = router;