import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Chip from '@material-ui/core/Chip';
import AdapterLink from '../common';

const useStyles = makeStyles(theme => {
  console.log('Theme', theme);
  return {
    root: {
      margin: '2px 0',
      borderRadius: 8,
      border: '1px solid rgba(0, 0, 0, 0.23)',
      '&:hover': {
        border: '1px solid rgba(0, 0, 0, 0.46)'
      }
    },
    chip: {
      margin: '0 2px'
    }
  };
});

function _getClipAction(action, item, index) {
  return function(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log(`Do ${action} on ${item} with index:${index}`);
  };
}

function PublicationListItem({ title, id, tags }) {
  const classes = useStyles();

  //TODO:
  // tag actions
  // panel grow on item click with item synopsis instead of straight forward to the reader route
  //  &and reader route by icon
  return (
    <ListItem
      button
      className={classes.root}
      component={AdapterLink}
      to={`/reader/:${id}`}
    >
      <ListItemText primary={title} />
      {tags.map((tag, index) => (
        <Chip
          key={tag}
          variant="outlined"
          size="small"
          label={tag}
          className={classes.chip}
          onDelete={_getClipAction('DELETE', tag, index)}
          onClick={_getClipAction('CLICK', tag, index)}
        />
      ))}
      <IconButton edge="end" aria-label="comments">
        <CommentIcon />
      </IconButton>
    </ListItem>
  );
}

PublicationListItem.defaultProps = {
  title: 'UNDEFINED_TITLE',
  id: 'UNDEFINED_ID',
  tags: []
};

PublicationListItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default PublicationListItem;
