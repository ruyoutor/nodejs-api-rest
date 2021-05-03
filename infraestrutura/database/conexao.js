const mysql = require('mysql');

const conexao = mysql.createConnection ({
    host: '192.168.1.25',
    port: '3306',
    user: 'root',
    password: 'admin',
    database: 'petshop'


})

module.exports = conexao;