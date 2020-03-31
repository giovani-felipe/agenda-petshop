const { GraphQLServer } = require("graphql-yoga");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/database/tabelas");
const Operacoes = require("./infraestrutura/operations");

conexao.connect(erro => {
  if (erro) {
    console.log(erro);
  }

  console.log("conectou no banco");

  Tabelas.init(conexao);
});

const Cliente = new Operacoes("cliente");

const resolvers = {
  Query: {
    status: () => "Servidor rodando!",
    clientes: () => Cliente.lista()
  },
  Mutation: {
    adicionarCliente: (root, params) => Cliente.adiciona(params)
  }
};

const servidor = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers
});

servidor.start(() => console.log("servidro ouvindo"));
