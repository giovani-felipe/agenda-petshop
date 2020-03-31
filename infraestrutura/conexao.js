const mysql = require('mysql')

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'mysql',
  password: 'mysql',
  database: 'agenda-petshop'
})

module.exports = conexao
