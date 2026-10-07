// Importa o Model Livro
const Livro = require('../models/Livro.js');

const livroController = {
    // Ação de listar os livros do acervo
    listar:(req, res) => {
        // 1. Busca os dados na Model
        const todosLivros = Livro.listarTodos();

        // 2. Entrega os dados para a View renderizar
        res.render('livros/index', {
            titulo: 'Acervo de Livros',
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

        // Tratamento seguro dos textos
        const tituloTexto = titulo ? titulo.trim() : '';
        const autorTexto = autor ? autor.trim() : '';
        const isbnTexto = isbn ? isbn.trim() : '';

        // 1. Validação de campos vazios
        if(!id || !tituloTexto || !autorTexto || !isbnTexto){
            return res.render('livros/cadastrar', {
                mensagemErro: 'Todos os campos são de preenchimento obrigatório.',
                dadosPrevios: {
                    id: id,
                    titulo: titulo,
                    autor: autor,
                    isbn: isbn
                }
            });
        }

        // 2. Validação de ID duplicado
        const idExiste = Livro.buscarPorId(id);
        if(idExiste){
            return res.render('livros/cadastrar', {
                mensagemErro: 'Já existe um livro cadastrado com este ID.',
                dadosPrevios: {
                    id: id,
                    titulo: titulo,
                    autor: autor,
                    isbn: isbn
                }
            });
        }

        // 3. Validação de ISBN duplicado
        const isbnExiste = Livro.buscarPorIsbn(isbn);
        if(isbnExiste){
            return res.render('livros/cadastrar', {
                mensagemErro: 'Este ISBN já está cadastrado para outro livro.',
                dadosPrevios: {
                    id: id,
                    titulo: titulo,
                    autor: autor,
                    isbn: isbn
                }
            });
        }

        // Instancia (cria) um novo objeto da classe livro
        const novoLivro = new Livro(id, titulo, autor, isbn);

        // Salva o novo livro no array em memória
        Livro.salvar(novoLivro);

        // Redireciona o usuário de volta para a lista de livros
        res.redirect('/livros');
    }
};

module.exports = livroController;