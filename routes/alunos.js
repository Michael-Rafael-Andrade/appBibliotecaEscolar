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

// Rota GET para abrir a página de edição de um aluno específico
router.get('/editar/:id', alunoController.exibirFormularioEdicao);

// Rota POST para guardar as alterações do aluno
router.post('/editar/:id', alunoController.atualizar);

// Rota POST para apagar um aluno registrado
router.post('/eliminar/:id', alunoController.eliminar);

module.exports = router;