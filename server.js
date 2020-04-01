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
const Pet = new Operacoes("pet");

const resolvers = {
  Query: {
    status: () => "Servidor rodando!",
    clientes: () => Cliente.lista(),
    cliente: (root, { id }) => Cliente.buscaPorId(id),
    pets: () => Pet.lista()
  },
  Mutation: {
    adicionarCliente: (root, params) => Cliente.adiciona(params),
    atualizarCliente: (root, params) => Cliente.atualiza(params),
    deletarCliente: (root, params) => Cliente.deleta(params),
    adicionarPet: (root, params) => Pet.adiciona(params)
  }
};

const servidor = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers
});

servidor.start(() => console.log("servidro ouvindo"));
