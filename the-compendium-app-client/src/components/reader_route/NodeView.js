import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

function NodeView({ node, setFocusedNode }) {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <h1>{node.getTitle()}</h1>
      <p>{node.getSynopsis()}</p>
      {Array.isArray(node.getContent()) ? (
        <ul>
          {node.getContent().map(childNode => (
            <li
              key={childNode.getTitle() + childNode.getIndex()}
              onClick={() => setFocusedNode(childNode)}
            >
              {childNode.getTitle()}
            </li>
          ))}
        </ul>
      ) : (
        <p>{node.getContent()}</p>
      )}
    </section>
  );
}

NodeView.defaultProps = {
  node: {},
  setFocusedNode: (...args) =>
    console.warn('setFocusedNode was not defined', args)
};

NodeView.propTypes = {
  node: PropTypes.object,
  setFocusedNode: PropTypes.func
};

export default NodeView;
