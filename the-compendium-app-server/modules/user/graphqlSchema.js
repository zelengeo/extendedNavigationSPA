const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    getUsers(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
  ): [User]
  }
  
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!):User!
    removeUser(email: String!):User!
  }`;

module.exports = typeDefs;

/*`
// #3 Define the respective type with three fields
// Note that the _id is created automatically by mongoose
  type Post {
    _id: ID,
    title: String,
    content: String
  },
  #4 Define the query type that must respond to 'posts' query
  type Query {
    posts: [Post]
  },
  #5 Define a mutation to add new posts with two required fields
  type Mutation {
    addPost(title: String!, content: String!): Post,
  }
`*/
