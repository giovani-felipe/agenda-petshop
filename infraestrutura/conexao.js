const mysql = require("mysql");

const conexao = mysql.createConnection({
  host: "db",
  port: 3306,
  user: "mysql",
  password: "mysql",
  database: "agenda-petshop",
  multipleStatements: true
});

module.exports = conexao;
