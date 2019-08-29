import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'auto',
    margin: `${theme.spacing(1)}px 0`,
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`
  },
  customScrollbar: {
    visibility: 'hidden',
    transition: 'visibility 0.2s',
    '&::-webkit-scrollbar-track': {
      width: 6,
      borderRadius: 4,
      backgroundColor: theme.palette.grey.A100
    },

    '&::-webkit-scrollbar': {
      width: 6
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: 4,
      backgroundColor: theme.palette.primary.light
    },
    '& > *, &:hover': {
      visibility: 'visible'
    }
  },
  childNodeList: {
    width: '100%'
  }
}));

function NodeView({ node, setFocusedNode }) {
  const classes = useStyles();
  return (
    <section className={clsx(classes.root, classes.customScrollbar)}>
      <Typography variant="h4" gutterBottom>
        {node.getTitle()}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {node.getSynopsis()}
      </Typography>
      <Divider />
      {Array.isArray(node.getContent()) ? (
        <List component="nav" className={classes.childNodeList}>
          {node.getContent().map(childNode => (
            <ListItem
              button
              alignItems="flex-start"
              key={childNode.getTitle() + childNode.getIndex()}
              onClick={() => setFocusedNode(childNode)}
            >
              <ListItemText
                primary={childNode.getTitle()}
                secondary={childNode.getSynopsis()}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">{node.getContent()}</Typography>
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
