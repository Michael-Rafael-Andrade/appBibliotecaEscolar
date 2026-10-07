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

        // Busca as listas atualizadas caso seja necessário recarregar a view com erro
        const todosLivros = Livro.listarTodos();
        const todosAlunos = Aluno.listarTodos();

        // 1. Validação de campos vazios
        if(!id || !alunoId || !livroId || !dataEmprestimo){
            return res.render('emprestimos/cadastrar', {
                mensagemErro: 'Todos os campos são de preenchimento obrigatório.',
                livros: todosLivros,
                alunos: todosAlunos,
                dadosPrevios: {
                    id: id,
                    alunoId: alunoId,
                    livroId: livroId,
                    dataEmprestimo: dataEmprestimo
                }
            });
        }

        // 2. Validação de ID de empréstimo duplicado
        const idExiste = Emprestimo.buscarPorId(id);
        if(idExiste){
            return res.render('emprestimos/cadastrar', {
                mensagemErro: 'Já existe um registro de empréstimo com este ID.',
                livros: todosLivros,
                alunos: todosAlunos,
                dadosPrevios: {
                    id: id,
                    alunoId: alunoId,
                    livroId: livroId,
                    dataEmprestimo: dataEmprestimo
                }
            });
        }

        // 3. Validação de disponibilidade do livro no backend
        const livroSelecionado = Livro.buscarPorId(livroId);
        if(!livroSelecionado || !livroSelecionado.disponivel){
            return res.render('emprestimos/cadastrar', {
                mensagemErro: 'O livro selecionado não está disponível para empréstimo.',
                livros: todosLivros,
                alunos: todosAlunos,
                dadosPrevios:{
                    id:id,
                    alunoId: alunoId,
                    livroId: livroId,
                    dataEmprestimo: dataEmprestimo
                }
            }); 
        }

        // Instancia o novo empréstimo se passar por todas as validações
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