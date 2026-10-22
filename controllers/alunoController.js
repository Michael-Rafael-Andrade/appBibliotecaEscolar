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
                    id: id,
                    nome: nome,
                    matricula: matricula,
                    turma: turma,
                }
            });
        }

        // 2. Validação de ID duplicado
        const idExiste = Aluno.buscarPorId(id);
        if (idExiste) {
            return res.render('alunos/cadastrar', {
                mensagemErro: 'Já existe um aluno cadastrado com este ID.',
                dadosPrevios: {
                    id: id,
                    nome: nome,
                    matricula: matricula,
                    turma: turma,
                }
            });
        }

        // 3. Validação de Matrícula duplicada
        const matriculaExiste = Aluno.buscarPorMatricula(matricula);
        if (matriculaExiste) {
            return res.render('alunos/cadastrar', {
                mensagemErro: 'Esta matrícula já está cadastrada para outro aluno.',
                dadosPrevios: {
                    id: id,
                    nome: nome,
                    matricula: matricula,
                    turma: turma
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
    },

    // Função para exibir o formulário de edição com dados atuais
    exibirFormularioEdicao: (req, res) => {
        // Obétm o parâmetro id a partir da URL do pedido
        const id = req.params.id;
        // Pesquisa o aluno na base de dados pelo ID
        const aluno = Aluno.buscarPorId(id);

        // Verifica se o aluno não foi encontrado
        if(!aluno){
            // Redireciona o utilizador de volta à listagem
            return res.redirect('/alunos');
        }

        // Renderiza a view de edição enviando o objeto aluno
        res.render('alunos/editar', {
            titulo: 'Editar Aluno',
            aluno: aluno,
        });
    },

    // Função para processar a atualização dos dados do aluno
    atualizar:(req, res) => {
        // Obtém o ID dos parâmetros contidos na URL
        const id = req.params.id;
        // Obtém o novo nome enviado no corpo do formulário
        const nome = req.body.nome;
        // Obtém a nova matrícula enviada no corpo
        const matricula = req.body.matricula;
        // Obtém a nova turma enviada no corpo
        const turma = req.body.turma;

        // Valida se os campos preenchidos não estão vazios
        if(!nome || !matricula || !turma){
            // Procura novamente os dados do aluno para manter a view
            const aluno = Aluna.buscarPorId(id);
            // Renderiza a tela de edição apresentando a mensagem de erro
            return res.render('alunos/editar', {
                mensagemErro: 'Preencha todos os campos para salvar.',
                aluno: aluno
            });
        }

        // Invoca a atualização dos dados na classe Model
        Aluno.atualizar(id, nome, matricula, turma);

        // Redireciona para a lista após guardar as alterações
        res.redirect('/alunos');
    },

    // Função para remover um aluno da base de dados
    eliminar: (req, res) => {
        // Obém o ID do aluno vindo do parâmetro da rota
        const id = req.params.id;
        // Executa a remoção do aluno correspondente na Model
        Aluno.eliminarPorId(id);
        // Redireciona o navegador de volta para a lista de alunos
        res.redirect('/alunos');
    }
};

module.exports = alunoController;