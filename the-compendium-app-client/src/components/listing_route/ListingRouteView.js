import React from 'react';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import { useQuery } from '@apollo/react-hooks';
import { getPublications } from './queries';
import PublicationListItem from './PublicationListItem';
import AddPublicationButtonDialogue from './AddPublicationButtonDialogue';

const useStyles = makeStyles(theme => ({
  publicationList: {
    width: '100%'
  },
  iconLeft: {
    marginRight: theme.spacing(1)
  }
}));

const getPublicationListItem = function(item) {
  return (
    <PublicationListItem
      key={item._id}
      id={item._id}
      title={item.root.title}
      synopsis={item.root.synopsis}
      tags={item.tags}
      date={item.date}
    />
  );
};

function ListingRouteView() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(getPublications());

  return (
    <React.Fragment>
      <AddPublicationButtonDialogue />
      {error && <p className="listing-view-error-message">ERROR</p>}

      {loading ? (
        <p className="listing-view-loading-message">LOADING</p>
      ) : (
        <List className={classes.publicationList}>
          {data.publications.filter(publication => publication.root).map(getPublicationListItem)}
        </List>
      )}
    </React.Fragment>
  );
}

export default ListingRouteView;
