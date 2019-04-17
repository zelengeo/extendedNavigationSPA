import ContentNode from './ContentNode';

const SYNOPSIS_DUMMY =
  'Vamus vitae magna at libero consequat auctor id a tellus. Vivamus suscipit aliquam dapibus. Morbi at tincidunt enim.';
const CONTENT_DUMMY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lectus erat, viverra et viverra eget, feugiat id neque. Curabitur a venenatis leo. Sed at augue in augue venenatis elementum. Proin bibendum viverra libero. Morbi dignissim enim sit amet risus vulputate elementum. Pellentesque consequat ex vel nunc bibendum, quis ultricies justo ultrices. Suspendisse a dui dapibus, volutpat lacus sit amet, fermentum justo. Aliquam erat volutpat. Donec vel ornare nibh. Duis at tortor augue. Vivamus accumsan hendrerit magna. Nullam sed laoreet lorem. Morbi convallis fringilla enim vel convallis. Fusce quam lacus, tincidunt non sem sit amet, vestibulum porttitor augue. Praesent quis convallis ante.';

export const DataModel = class DataModel {
  constructor(data) {
    // Should be argument data.
    /* DUMMY DATA TO IMPLEMENT DATAMODEL INTERFACE*/
    const newData = {};
    newData.title = 'The Trilogy.';
    newData.synopsis = 'The synopsis of The Trilogy.';
    newData.content = Array.from([1, 2, 3], bookNum => ({
      title: `The Trilogy. Book ${bookNum}.`,
      synopsis: `Synopsis of the book ${bookNum}.${SYNOPSIS_DUMMY}`,
      content: Array.from([1, 2, 3, 4, 5, 6, 7, 8], chapterNum => ({
        title: `The Trilogy. Book ${bookNum}. Chapter ${chapterNum}.`,
        synopsis: `Synopsis of the Chapter ${chapterNum}.${SYNOPSIS_DUMMY}`,
        content: Array.from([1, 2, 3, 4, 5, 6, 7, 8], paragraphNum => ({
          title: `Short title of the Chapter ${chapterNum}, of the book ${bookNum}, of The Trilogy.`,
          synopsis: `Synopsis of the Chapter ${chapterNum}, of the book ${bookNum}, of The Trilogy.${SYNOPSIS_DUMMY}`,
          content: `Content itself of the Paragraph number ${paragraphNum}.${CONTENT_DUMMY}`
        }))
      }))
    }));

    let mapDataToNodes = function(data, index = 0) {
      const contentNode = new ContentNode(
        null,
        index,
        data.title,
        data.synopsis,
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
