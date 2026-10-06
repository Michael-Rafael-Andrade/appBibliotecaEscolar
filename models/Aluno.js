// Array em memória para guardar os alunos
const alunosDB = [];

class Aluno {
    // O Construtor define os atributos do aluno
    constructor(id, nome, matricula, turma){
        this.id = id;                       // ID do aluno
        this.nome = nome;                   // Nome completo
        this.matricula = matricula;         // Número da matrícula
        this.turma = turma;                 // Turma do aluno
    }

    // Método estático para buscar todos os alunos
    static listarTodos(){
        return alunosDB;
    }

    // Método estático para guardar um novo aluno
    static salvar(aluno){
        alunosDB.push(aluno);
        return aluno;
    }

    // Busca um aluno pelo ID
    static buscarPorId(id){
        const alunoEncontrado = alunosDB.find((a) => String(a.id) === String(id));
        return alunoEncontrado;
    }

    // Busca um aluno pela Matrícula
    static buscarPorMatricula(matricula){
        const alunoEncontrado = alunosDB.find(
            (a) => String(a.matricula).trim() === String(matricula).trim()
        );
        return alunoEncontrado;
    }
}

// Exporta a classe para os outros arquivos
module.exports = Aluno;