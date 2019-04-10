const ContentNode = class ContentNode {
  constructor(parent, index, description, content) {
    this._parent = parent;
    this._index = index;
    this._description = description;
    this._content = content;
  }

  getDescription() {
    return this._description;
  }

  getContent() {
    return this._content;
  }

  getParent() {
    return this._parent;
  }

  setParent(parent) {
    this._parent = parent;
  }

  getIndex() {
    return this._index;
  }

  setIndex(index) {
    this._index = index;
  }
};

export default ContentNode;
