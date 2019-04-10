import ContentNode from './ContentNode';

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

    let mapDataToNodes = function(data, index = 0) {
      const contentNode = new ContentNode(
        null,
        index,
        data.description,
        Array.isArray(data.content)
          ? data.content.map(mapDataToNodes)
          : data.content
      );

      Array.isArray(contentNode.getContent()) &&
        contentNode.getContent().forEach(function(elem) {
          elem.setParent(contentNode);
        });

      return contentNode;
    };

    this._root = mapDataToNodes(newData);
  }

  // Interface
  getRoot() {
    return this._root;
  }

  getPredecessors(targetNode = this._root, count = 3) {
    let predecessorArray = [];
    let parent = targetNode.getParent();
    let i = count;
    while (i && parent) {
      predecessorArray.unshift(parent);
      parent = parent.getParent();
      i--;
    }
    return predecessorArray;
  }

  getAncestors(targetNode = this._root, count = 3) {
    let ancestorArray = [];
    let content = targetNode.getContent();
    let i = count;
    while (i && Array.isArray(content) && content.length) {
      ancestorArray.push(content[0]);
      content = content[0].getContent();
      i--;
    }
    return ancestorArray;
  }

  getPreviousSiblings(targetNode = this._root, count = 3) {
    return count && targetNode.getIndex() >= count
      ? targetNode
          .getParent()
          .getContent()
          .slice(targetNode.getIndex() - count, targetNode.getIndex())
      : targetNode.getParent()
      ? targetNode
          .getParent()
          .getContent()
          .slice(0, targetNode.getIndex())
      : [];
  }

  getFollowingSiblings(targetNode = this._root, count = 3) {
    return targetNode.getParent() && count
      ? targetNode
          .getParent()
          .getContent()
          .slice(targetNode.getIndex() + 1, targetNode.getIndex() + 1 + count)
      : [];
  }

  // Private helpers
};

export default DataModel;
