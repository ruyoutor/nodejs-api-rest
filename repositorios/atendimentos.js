const queries = require('../infraestrutura/database/queries')

class Atendimento {

    adiciona(atendimento){
        const sql = 'INSERT INTO Atendimentos SET ?'
        return queries(sql, atendimento)
    }

    listar(){
        const sql = 'SELECT * FROM Atendimentos';

        return queries(sql)
    }

}

module.exports = new Atendimento()