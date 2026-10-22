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
    // Método estático para atualizar os dados de um aluno existente
    static atualizar(id, nome, matricula, turma){
        const aluno = Aluno.buscarPorId(id);
        if(aluno){
            aluno.nome = nome;
            aluno.matricula = matricula;
            aluno.turma = turma;
        }
        // Retorna o objeto aluno alterado
        return aluno;
    }

    // Método estático para remover um aluno do array pelo ID
    static eliminarPorId(id){
        // Localiza o índice da posição do aluno no array
        const indice = alunosDB.findIndex(
            (a) => String(a.id) === String(id)
        );
        if(indice !== -1){
            alunosDB.splice(indice, 1);
            return true;
        }
    }
}

// Exporta a classe para os outros arquivos
module.exports = Aluno;