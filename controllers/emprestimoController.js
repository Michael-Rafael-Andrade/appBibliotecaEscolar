// Importa as três Models necessárias
const Emprestimo = require('../models/Emprestimo.js');
const Livro = require('../models/Livro.js');
const Aluno = require('../models/Aluno.js');

const emprestimoController = {
    // Exibe a lista de empréstimos
    listar: (req, res) => {
        const todosEmprestimos = Emprestimo.listarTodos();

        res.render('emprestimos/index', {
            titulo: 'Registro de Empréstimos',
            emprestimos: todosEmprestimos
        });
    },

    // Exibe o formulário enviando os alunos e livros cadastrados
    exibirFormulario: (req, res) => {
        const todosLivros = Livro.listarTodos();
        const todosAlunos = Aluno.listarTodos();

        res.render('emprestimos/cadastrar', {
            livros: todosLivros,
            alunos: todosAlunos
        });
    },

    // Processa o empréstimo e altera a disponibilidade do livro
    cadastrar: (req, res) => {
        // Leitura direta dos campos (sem desestruturação)
        const id = req.body.id;
        const alunoId = req.body.alunoId;
        const livroId = req.body.livroId;
        const dataEmprestimo = req.body.dataEmprestimo;

        // Instancia o novo empréstimo
        const novoEmprestimo = new Emprestimo(
            id,
            alunoId,
            livroId,
            dataEmprestimo
        );

        // Salva o registro de empréstimo
        Emprestimo.salvar(novoEmprestimo);

        // Altera o status do livro emprestado para false (indisponível)
        Livro.atualizarStatus(livroId, false);

        // Redireciona para a lista de empréstimos
        res.redirect('/emprestimos');
    },

  // Processa a devolução do livro
  devolver: (req, res) => {
        // Leitura direta sem desestruturação
        const id = req.body.id;

        // Busca o empréstimo
        const emprestimo = Emprestimo.buscarPorId(id);

        if (emprestimo) {
            // 1. Marca o empréstimo como inativo (false)
            Emprestimo.finalizar(id);

            // 2. Devolve a disponibilidade do livro (true)
            Livro.atualizarStatus(emprestimo.livroId, true);
        }

        res.redirect('/emprestimos');
    }

};

module.exports = emprestimoController;