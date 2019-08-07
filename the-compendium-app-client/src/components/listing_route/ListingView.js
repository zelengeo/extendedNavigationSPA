import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import PublicationListItem from './PublicationListItem';

const useStyles = makeStyles(theme => ({
  publicationList: {
    width: '100%'
  },
  iconLeft: {
    marginRight: theme.spacing(1)
  },
  addPublicationButton: {
    margin: `${theme.spacing(2)}px 0`
  }
}));

const _getPublicationListItem = function(item) {
  return <PublicationListItem key={item.id} {...item} />;
};

function ListingView() {
  const classes = useStyles();
  const [publicationList, setPublicationList] = useState([
    {
      id: 'qwe123456',
      title: 'Application State Management with React',
      synopsis: 'Application State Management with React synopsis',
      tags: ['React', 'js', 'Frontend']
    },
    {
      id: 'wer234567',
      title: 'GraphQL Server Basics: GraphQL Schemas, TypeDefs & Resolvers',
      synopsis:
        'GraphQL Server Basics: GraphQL Schemas, TypeDefs & Resolvers synopsis',
      tags: ['GraphQL', 'js', 'Backend']
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        className={classes.addPublicationButton}
        color="primary"
        onClick={event => console.log('ONCLICK', event.target)}
      >
        <SaveIcon className={classes.iconLeft} />
        Add publication
      </Button>
      {isError && <p className="listing-view-error-message">ERROR</p>}

      {isLoading ? (
        <p className="listing-view-loading-message">LOADING</p>
      ) : (
        <List className={classes.publicationList}>
          {publicationList.map(_getPublicationListItem)}
        </List>
      )}
    </React.Fragment>
  );
}

export default ListingView;
