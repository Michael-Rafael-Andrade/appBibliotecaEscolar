// Importa o Model Livro
const Livro = require('../models/Livro.js');

const livroController = {
    // Ação de listar os livros do acervo
    listar:(req, res) => {
        // 1. Busca os dados na Model
        const todosLivros = Livro.listarTodos();

        // 2. Entrega os dados para a View renderizar
        res.render('livros/index', {
            titulo: 'Acervo de livros',
            livros: todosLivros
        });
    },

    // Exibe a tela com o formulário de cadastro
    exibirFormulario: (req, res) => {
        res.render('livros/cadastrar');
    },

    // Recebe os dados do formulário e salva na memória
    cadastrar: (req, res) => {
        // Extrai os campos enviados no formulário
        // const {
        //     id,
        //     titulo,
        //     autor,
        //     isbn
        // } = req.body;
        const id = req.body.id;
        const titulo = req.body.titulo;
        const autor = req.body.autor;
        const isbn = req.body.isbn;

        // Instancia (cria) um novo objeto da classe livro
        const novoLivro = new Livro(id, titulo, autor, isbn);

        // Salva o novo livro no array em memória
        Livro.salvar(novoLivro);

        // Redireciona o usuário de volta para a lista de livros
        res.redirect('/livros');
    }
};

module.exports = livroController;