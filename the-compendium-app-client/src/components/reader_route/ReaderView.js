import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DataModel from '../../utils/DataModel';
import useEventHandler from '../../utils/useEventListener';
import NodeView from './NodeView';
import SideNodeView from './SideNodeView';

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

function handleClick(event) {
  event.preventDefault();
  alert('You clicked a breadcrumb.');
}

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3)
  }
}));

function ReaderView({ dataModel }) {
  const classes = useStyles();

  const [focusedNode, setFocusedNode] = useState(dataModel.getRoot());

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
          setFocusedNode(focusedNode.getParent().getContent()[focusedNode.getIndex() - 1]);
        }
        break;
      case MOVE_MAP.RIGHT:
        if (Array.isArray(focusedNode.getContent())) {
          setFocusedNode(focusedNode.getContent()[0]);
        }
        break;
      case MOVE_MAP.DOWN:
        if (focusedNode.getParent() && focusedNode.getParent().getContent().length - 1 > focusedNode.getIndex()) {
          setFocusedNode(focusedNode.getParent().getContent()[focusedNode.getIndex() + 1]);
        }
        break;
      default:
        console.error('Wrong key at navigation handler: ', direction);
        return null;
    }
  };

  return (
    <React.Fragment>
      <Paper elevation={2} className={classes.paper}>
        <Breadcrumbs aria-label="breadcrumb">
          {dataModel.getPredecessors(focusedNode, 9).map(node => (
            <Button key={node.getTitle() + node.getIndex()} variant="text" onClick={() => setFocusedNode(node)}>
              {node.getTitle()}
            </Button>
          ))}
          <Typography>{focusedNode.getTitle()}</Typography>
        </Breadcrumbs>
      </Paper>
      <SideNodeView
        orientedTop
        setFocusedNode={setFocusedNode}
        sideNodes={dataModel.getPreviousSiblings(focusedNode)}
      />
      <NodeView node={focusedNode} setFocusedNode={setFocusedNode} />
      <SideNodeView
        orientedTop={false}
        setFocusedNode={setFocusedNode}
        sideNodes={dataModel.getFollowingSiblings(focusedNode)}
      />
    </React.Fragment>
  );
}

ReaderView.defaultProps = {
  dataModel: new DataModel()
};

ReaderView.propTypes = {
  dataModel: PropTypes.object
};

export default ReaderView;
