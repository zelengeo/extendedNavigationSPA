const ContentNode = class ContentNode {
  constructor(parent, index, description, children) {
    this._parent = parent;
    this._index = index;
    this._description = description;
    this._children = children;
  }

  getDescription() {
    return this._description;
  }

  getContent() {
    return this._children;
  }

  getParent() {
    return this._parent;
  }

  getIndex() {
    return this._index;
  }
};

export const DataModel = class DataModel {
  constructor(data) {
    // Should be argument data.
    /* DUMMY DATA TO IMPLEMENT DATAMODEL INTERFACE*/
    let newData = {};
    newData.description = 'The Trilogy. Description';
    newData.content = Array.from([1, 2, 3], bookNum => ({
      description: `The Trilogy. Book ${bookNum}.\nDescription of the book ${bookNum}.`,
      content: Array.from([1, 2, 3, 4, 5, 6, 7, 8], chapterNum => ({
        description: `The Trilogy. Book ${bookNum}. Chapter ${chapterNum}.\nDescription of the Chapter ${chapterNum}.`,
        content: Array.from([1, 2, 3, 4, 5, 6, 7, 8], paragraphNum => ({
          description: `Short description of the Chapter ${chapterNum}, of the book ${bookNum}, of The Trilogy.`,
          content: `Content itself of the Paragraph number ${paragraphNum}`
        }))
      }))
    }));

    let mapDataToNodes = (data, index = 0, parent) => {
      // TODO level count (? is needed), set parents
      return new ContentNode(
        parent,
        index,
        data.description,
        Array.isArray(data.content)
          ? data.content.map(mapDataToNodes)
          : data.content
      );
    };

    this._levelCount = 0;
    this._root = mapDataToNodes(newData);
    console.log('ROOT', this._root);
  }
};

export default DataModel;
