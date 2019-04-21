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

  /*
   * Return array with indexes, which describes node address in tree.
   * //TODO consider better way of indexing. Also unshift has worse performance. Also not needed yet.
   */
  getIndexSequence() {
    const indexSequence = [this._index];
    let parent = this._parent;
    while (parent) {
      indexSequence.unshift(parent.getIndex());
      parent = parent.getParent();
    }
    indexSequence.shift();
    return indexSequence;
  }

  setIndex(index) {
    this._index = index;
  }
};

export default ContentNode;
