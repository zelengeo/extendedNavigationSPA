const { Publication, Node } = require("./models/publication.js");


const resolvers = {
  Publication: {
    root: async (parent, args, context, info) => parent.root ? await Node.findById(parent.root) : null
  },

  Node: {
    children: async (parent, args, context, info) => {
      return parent.children
        ? await Node.find({ "_id": { $in: parent.children } }, (err, docs) => {
          console.log(err, docs);
        })
        : null;
    }
  },

  Query: {
    publications: () => Publication.find({}),

    publication: (parent, args) => Publication.findById(args._id),

    nodes: () => Node.find({}),

    node: (parent, args) => Node.findById(args._id)
  },

  Mutation: {
    addPublication: (parent, args, context, info) => {
      const newPublication = new Publication({
        tags: args.params.tags,
        date: args.params.date,
        root: args.params.root
      });
      return newPublication.save();
    },

    addNode: (parent, args, context, info) => {
      const newNode = new Node({
        title: args.params.title,
        synopsis: args.params.synopsis,
        content: args.params.content,
        children: args.params.children
      });
      return newNode.save();
    },

    updatePublication: (parent, args, context, info) => Publication.findByIdAndUpdate(args.params._id, args.params),

    updateNode: (parent, args, context, info) => Node.findByIdAndUpdate(args.params._id, args.params),

    removePublication: (parent, args, context, info) => Publication.findOneAndDelete({ _id: args._id }),

    removeNode: (parent, args, context, info) => Node.findOneAndDelete({ _id: args._id })
  }
};

module.exports = resolvers;
