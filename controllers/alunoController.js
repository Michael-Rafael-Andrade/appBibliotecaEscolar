// Importa a Model (Modelo) de Aluno
const Aluno = require('../models/Aluno.js');

const alunoController = {
    // Exibe a lista com todos os alunos
    listar: (req, res) => {
        const todosAlunos = Aluno.listarTodos();
        res.render('alunos/index', {
            titulo: 'Lista de Alunos',
            alunos: todosAlunos,
        });
    },

    // Exibe a tela com o formulário de cadastro
    exibirFormulario: (req, res) => {
        res.render('alunos/cadastrar');
    },

    // Recebe os dados do formulário e salva
    cadastrar: (req, res) => {
        // Leitura direta dos campos do formulário
        const id = req.body.id;
        const nome = req.body.nome;
        const matricula = req.body.matricula;
        const turma = req.body.turma;

        // Cria a nova instância do aluno
        const novoAluno = new Aluno(
            id,
            nome,
            matricula,
            turma
        );

        // Salva o aluno na memória
        Aluno.salvar(novoAluno);

        // Redireciona para a lista de alunos
        res.redirect('/alunos');
    }
};

module.exports = alunoController;