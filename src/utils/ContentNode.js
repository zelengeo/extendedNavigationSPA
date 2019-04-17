const ContentNode = class ContentNode {
  constructor(parent, index, title, synopsis, content) {
    this._parent = parent;
    this._index = index;
    this._title = title;
    this._synopsis = synopsis;
    this._content = content;
  }

  getTitle() {
    return this._title;
  }

  getSynopsis() {
    return this._synopsis;
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
