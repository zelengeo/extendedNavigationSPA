const { Schema, model } = require("mongoose");

const publicationSchema = new Schema({
  tags: [String],
  date: { type: Date, default: Date.now },
  root: { type: Schema.Types.ObjectId, ref: "nodes" }
});

const Publication = model("publications", publicationSchema);

const nodeSchema = new Schema({
  title: String,
  synopsis: String,
  content: { type: String, default: "" },
  children: [{ type: Schema.Types.ObjectId, ref: "nodes" }]
});

const Node = model("nodes", nodeSchema);

module.exports = { Publication, Node };
