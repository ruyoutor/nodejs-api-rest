const conexao = require("./conexao");

class Tabelas {
    init(conexao){
        this.conexao = conexao;

        this.criaAtendimentos()
        this.criarPets()

    }

    criaAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos ( \
            id int NOT NULL AUTO_INCREMENT, \
            cliente varchar(11) NOT NULL, \
            pet varchar(20), \
            servico varchar(20) NOT NULL, \
            status varchar(20) NOT NULL,  \
            data datetime NOT NULL, \
            dataCriacao datetime NOT NULL, \
            observacoes text, PRIMARY KEY(id) \
        )'
        
        //SET character_set_client = utf8; \
        //SET character_set_connection = utf8; \
        //SET character_set_results = utf8; \
        //SET collation_connection = utf8_general_ci;'

        this.conexao.query(sql, (erro) => {
            if (erro){
                console.log(erro);
            } else {
                console.log('Tabela foi criada');
            }
        })
    }

    criarPets() {
        const query = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar(200), PRIMARY KEY(id))'

        this.conexao.query(query, (erro) => {
            if (erro){
                console.log(erro)
            } else {
                console.log('Tabela Pets Criada')
            }
        })
    }
}

module.exports = new Tabelas;