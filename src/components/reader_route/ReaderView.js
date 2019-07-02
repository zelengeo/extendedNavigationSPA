import React, { useState } from 'react';
import DataModel from '../../utils/DataModel';
import useEventHandler from '../../utils/useEventListener';
import NodeView from './NodeView';
import SideNodeView from './SideNodeView';

import './ReaderView.scss';

const SIDE_NODES = ['left', 'right', 'top', 'bottom'];

const MOVE_MAP = {
  LEFT: -1,
  RIGHT: 1,
  DOWN: 3,
  UP: -3
};

const KEYBOARD_EVENTS_MOVE_MAP = {
  ArrowLeft: MOVE_MAP.LEFT,
  KeyA: MOVE_MAP.LEFT,
  ArrowRight: MOVE_MAP.RIGHT,
  KeyD: MOVE_MAP.RIGHT,
  ArrowUp: MOVE_MAP.UP,
  KeyW: MOVE_MAP.UP,
  ArrowDown: MOVE_MAP.DOWN,
  KeyS: MOVE_MAP.DOWN
};

function ReaderView({ match }) {
  // match.params.id = id prop
  const _dataModel = new DataModel();
  const [focusedNode, setFocusedNode] = useState(_dataModel.getRoot());

  useEventHandler('keydown', function(event) {
    if (KEYBOARD_EVENTS_MOVE_MAP.hasOwnProperty(event.code)) {
      event.preventDefault();
      _handleNavigation(KEYBOARD_EVENTS_MOVE_MAP[event.code]);
    }
  });

  // private helpers
  const _handleNavigation = function(direction) {
    switch (direction) {
      case MOVE_MAP.LEFT:
        if (focusedNode.getParent()) {
          setFocusedNode(focusedNode.getParent());
        }
        break;
      case MOVE_MAP.UP:
        if (focusedNode.getIndex()) {
          setFocusedNode(
            focusedNode.getParent().getContent()[focusedNode.getIndex() - 1]
          );
        }
        break;
      case MOVE_MAP.RIGHT:
        if (Array.isArray(focusedNode.getContent())) {
          setFocusedNode(focusedNode.getContent()[0]);
        }
        break;
      case MOVE_MAP.DOWN:
        if (
          focusedNode.getParent() &&
          focusedNode.getParent().getContent().length - 1 >
            focusedNode.getIndex()
        ) {
          setFocusedNode(
            focusedNode.getParent().getContent()[focusedNode.getIndex() + 1]
          );
        }
        break;
      default:
        console.error('Wrong key at navigation handler: ', direction);
        return null;
    }
  };

  const _getSideNodeChildren = function(side) {
    switch (side) {
      case 'left':
        return _dataModel.getPredecessors(focusedNode, 1);
      case 'top':
        return _dataModel.getPreviousSiblings(focusedNode);
      case 'right':
        return _dataModel.getAncestors(focusedNode, 2);
      case 'bottom':
        return _dataModel.getFollowingSiblings(focusedNode);
      default:
        console.error('Wrong key at getting side node data: ', side);
        return null;
    }
  };

  return (
    <div className={'reader-view'}>
      {SIDE_NODES.map(function(side) {
        return (
          <SideNodeView
            key={'side_node_' + side}
            className={side}
            setFocusedNode={setFocusedNode}
          >
            {_getSideNodeChildren(side)}
          </SideNodeView>
        );
      })}
      <NodeView node={focusedNode} setFocusedNode={setFocusedNode} />
    </div>
  );
}

export default ReaderView;
