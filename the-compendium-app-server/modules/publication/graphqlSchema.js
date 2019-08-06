const { gql } = require("apollo-server-express");

const typeDefs = gql`   
  type Publication {
    _id: ID!
    tags: [String]
    date: String!
    root: Node
  }
  
  type Node {
    _id: ID!
    title: String!
    synopsis: String
    content: String
    children: [Node!]!
  }

  input CreatePublicationInput {
    tags: [String], 
    date: String!, 
    root: CreateNodeInput
  }
  
  input UpdatePublicationInput {
    _id:ID!,
    tags: [String], 
    date: String!, 
    root: CreateNodeInput
  }

  
  input CreateNodeInput {
    title: String!
    synopsis: String
    content: String
    children: [CreateNodeInput!]
    }
    
    
  input UpdateNodeInput {
    _id:ID!
    title: String
    synopsis: String
    content: String
    children: [ID!]
  }
  
  
  
  type Query {
    publications: [Publication!]!
    publication(_id:ID!): Publication
    
    nodes: [Node!]!
    node(_id:ID!): Node
  }
  
  type Mutation {
    addPublication(params: CreatePublicationInput!):Publication!
    updatePublication(params: UpdateNodeInput!):Publication!
    removePublication(_id:ID!):Publication!
    
    addNode(params: CreateNodeInput!):Node!
    updateNode(params: UpdateNodeInput!):Node!
    removeNode(_id:ID!):Node!
  }`;

module.exports = typeDefs;


// First try with unions
// `
//   interface Entity {
//     _id: ID!
//   }
//
//   union NodeValue = Content | Children
//
//   type Content {
//     content: String!
//   }
//
//   type Children {
//     children: [Node!]!
//   }
//
//   type Publication implements Entity {
//     _id: ID!
//     tags: [String]
//     date: String!
//     root: Node
//   }
//
//   type Node implements Entity {
//     _id: ID!
//     title: String!
//     synopsis: String
//     value: NodeValue!
//   }
//
//
//
//   input CreatePublicationInput {
//     tags: [String],
//     date: String!,
//     root: CreateNodeInput
//   }
//
//   input NodeValueInput {
//     content: String!
//   }
//
//   input CreateNodeInput {
//     title: String!
//     synopsis: String
//     value: NodeValueInput!
//   }
//
//   type Query {
//     publications: [Publication]!
//     publication(_id:ID!): Publication
//
//     nodes: [Node]!
//     node(_id:ID!): Node
//   }
//
//   type Mutation {
//     addPublication(params: CreatePublicationInput!):Publication!
//     removePublication(_id:ID!):Publication!
//
//     addNode(params: CreateNodeInput!):Node!
//     removeNode(_id:ID!):Node!
//   }`
