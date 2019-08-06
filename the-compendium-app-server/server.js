const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("./config/database");
const typeDefs = require("./modules/publication/graphqlSchema");
const resolvers = require("./modules/publication/resolvers");


const server = new ApolloServer({ typeDefs, resolvers });
const app = express(cors());
//TODO WTF PORT SHOULD BE DEFINED IN HANDLE
const port = process.env.PORT || 4000;
server.applyMiddleware({ app });
app.listen({ port }, () => {
  console.log(`Server running on http://localhost:${port}${server.graphqlPath}`);
});
