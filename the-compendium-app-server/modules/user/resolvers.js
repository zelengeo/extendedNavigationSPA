const User = require("./models/user.js");


const resolvers = {
  Query: {
    // Query which returns posts list
    getUsers: () => User.find({})
  },

  Mutation: {
    addUser: (parent, user) => {
      // Create a new record in the database
      const newUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
      // Save the record and return it
      return newUser.save();
    },
    removeUser: (parent, user) => {
      const removedUser = USer.findOneAndDelete({
        email: user.email
      });
      return removedUser;
    }
  }
};

module.exports = resolvers;
