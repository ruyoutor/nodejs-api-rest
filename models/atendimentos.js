const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultado) => {
            if (erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultado) => {
            if (erro){
                res.status(400).json(erro)
            } else {
                const atendimento = resultado[0];
                res.status(200).json(atendimento);
            }
        })
    }

    altera(id, valores, res) {
        if (valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');   
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        conexao.query(sql, [valores, id], (erro, resultado) => {
            if (erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        })
    }

    adiciona(atendimento, res){
        const dataCriacao = moment(new Date(), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if (existemErros){
            res.status(400).json(erros);
        } else {

            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultado) => {
                if (erro){
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(resultado);
                }
            })
        }
    }


}

module.exports = new Atendimento();