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

        // Tratamneto seguro dos textos para evitar erro de .trim() em undefined
        const nomeTexto = nome ? nome.trim() : '';
        const matriculaTexto = matricula ? matricula.trim() : '';
        const turmaTexto = turma ? turma.trim() : '';

        // 1. Validação de campos vazios
        if (!id || !nome.trim() || !matricula.trim() || !turma.trim()) {
            return res.render('alunos/cadastrar', {
                mensagemErro: 'Todos os campos são de preenchimento obrigatório.',
                dadosPrevios: {
                    id,
                    nome,
                    matricula,
                    turma
                }
            });
        }

        // 2. Validação de ID duplicado
        const idExiste = Aluno.buscarPorId(id);
        if (idExiste) {
            return res.render('alunos/cadastrar', {
                mensagemErro: 'Já existe um aluno cadastrado com este ID.',
                dadosPrevios: {
                    id,
                    nome,
                    matricula,
                    turma
                }
            });
        }

        // 3. Validação de Matrícula duplicada
        const matriculaExiste = Aluno.buscarPorMatricula(matricula);
        if (matriculaExiste) {
            return res.render('alunos/cadastrar', {
                mensagemErro: 'Esta matrícula já está cadastrada para outro aluno.',
                dadosPrevios: {
                    id,
                    nome,
                    matricula,
                    turma
                }
            });
        }

        // Se passou por todas as validações, cria e salva o aluno
        const novoAluno = new Aluno(
            id,
            nome,
            matricula,
            turma
        );

        // Salva o novo aluno no array em memória
        Aluno.salvar(novoAluno);

        // Redireciona para a listagem
        res.redirect('/alunos');
    }
};

module.exports = alunoController;