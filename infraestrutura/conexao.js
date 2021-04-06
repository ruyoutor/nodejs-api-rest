const mysql = require('mysql');

const conexao = mysql.createConnection ({
    host: '192.168.1.15',
    port: '3306',
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'


})

module.exports = conexao;