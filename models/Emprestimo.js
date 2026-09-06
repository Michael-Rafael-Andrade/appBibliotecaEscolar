// Array em memória para guardar os empréstimos
const emprestimosDB = [];

class Emprestimo {
    constructor(id, alunoId, livroId, dataEmprestimo) {
        this.id = id;
        this.alunoId = alunoId;
        this.livroId = livroId;
        this.dataEmprestimo = dataEmprestimo;
        this.ativo = true; // Todo novo empréstimo começa ativo
    }

    // Retorna a lista de todos os empréstimos
    static listarTodos() {
        return emprestimosDB;
    }

    // Guarda um novo empréstimo no array
    static salvar(emprestimo) {
        emprestimosDB.push(emprestimo);
        return emprestimo;
    }

    // Busca um empréstimo pelo ID
    static buscarPorId(id) {
        const emprestimoEncontrado = emprestimosDB.find((e) => String(e.id) === String(id));
        return emprestimoEncontrado;
    }

    // Desativa o empréstimo
    static finalizar(id) {
        const emprestimo = Emprestimo.buscarPorId(id);
        if (emprestimo) {
            emprestimo.ativo = false;
        }
    }

}

module.exports = Emprestimo;