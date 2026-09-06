// Array em memória para simular o banco de dados de livros
const livrosDB = [];

class Livro {
    // O construtor define a estrutura de atributos da entidade
    constructor(id, titulo, autor, isbn, disponivel = true) {
        this.id = id;   // Identificador único do exemplar
        this.titulo = titulo;   // Nome da obra
        this.autor = autor;     // Autor do livro
        this.isbn = isbn;       // Código de indetificação internacional
        this.disponivel = disponivel;       // Booleano: true(disponível) ou false(emprestado)
    }

    // Método estático para buscar todos os registros do array
    static listarTodos() {
        return livrosDB;
    }

    // Método estático para salvar um novo exemplar na memória
    static salvar(livro) {
        livrosDB.push(livro);
        return livro;
    }

    // Busca um livro específico pelo ID
    static buscarPorId(id) {
        // Converte ambos para String para garantir a comparação correta
        const livroEncontrado = livrosDB.find((l) => String(l.id) === String(id));
        return livroEncontrado;
    }

    // Altera a disponibilidade do livro
    static atualizarStatus(id, status) {
        const livro = Livro.buscarPorId(id);
        if (livro) {
            livro.disponivel = status;
        }
    }
}

// Exporta a classe para ser utilizada pelos Controllers
module.exports = Livro;