import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import NotesIcon from '@material-ui/icons/Notes';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';
import AdapterLink from '../common';

const useStyles = makeStyles(theme => {
  console.log('Theme', theme);
  return {
    root: {},
    panelSummary: {
      alignItems: 'center'
    },
    panelDetails: {
      display: 'flex',
      alignItems: 'center'
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightMedium,
      flexGrow: 1
    },
    details: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      flexGrow: 1
    },
    chip: {
      margin: theme.spacing(0.25)
    }
  };
});

// TODO Add switch. Also consider if remover icon is needed here.
function getClipAction(action, item, index) {
  return function(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log(`Do ${action} on ${item} with index:${index}`);
  };
}

function PublicationListItem({ id, title, synopsis, tags }) {
  const classes = useStyles();
  const renderExpansionPanel = React.forwardRef((props, ref) => (
    <ExpansionPanel innerRef={ref}>
      <ExpansionPanelSummary
        expandIcon={<ExpandIcon />}
        aria-controls={`${id}_panel-content`}
        id={`${id}_panel-header`}
        classes={{ content: classes.panelSummary }}
      >
        <IconButton
          edge="start"
          aria-label="articleLink"
          component={AdapterLink}
          to={`/reader/:${id}`}
        >
          <NotesIcon />
        </IconButton>
        <Typography className={classes.heading}>{title}</Typography>
        {tags.map((tag, index) => (
          <Chip
            key={tag}
            variant="outlined"
            size="small"
            label={tag}
            className={classes.chip}
            onDelete={getClipAction('DELETE', tag, index)}
            onClick={getClipAction('CLICK', tag, index)}
          />
        ))}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography className={classes.details}>{synopsis}</Typography>
        <Fab aria-label="deletePublication" color="secondary" size="medium">
          <DeleteIcon />
        </Fab>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));
  return <ListItem className={classes.root} component={renderExpansionPanel} />;
}

PublicationListItem.defaultProps = {
  title: 'UNDEFINED_TITLE',
  synopsis: 'UNDEFINED_SYNOPSIS',
  id: 'UNDEFINED_ID',
  tags: []
};

PublicationListItem.propTypes = {
  synopsis: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default PublicationListItem;
