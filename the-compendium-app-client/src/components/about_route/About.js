import React from 'react';

function About() {
  return (
    <React.Fragment>
      <h1> ABOUT </h1>
      <h3>Well, i've decided to use this route to keep some notes</h3>
      <h6>
        Lets do the publications route: needed publication list and form on
        edit/add
      </h6>
      <code>
        {`type Publication {
        _id: ID!
        tags: [String]
        date: String!
        root: Node
      }`}
      </code>
      <p>Publication needs title, tags</p>
      <code>
        {`
        type Node {
        _id: ID!
        title: String!
        synopsis: String
        content: String
        children: [Node!]!
      }`}
      </code>
    </React.Fragment>
  );
}

export default About;
