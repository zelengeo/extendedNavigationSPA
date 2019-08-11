import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
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
      <AddPublicationButtonDialogue />
      {isError && <p className="listing-view-error-message">ERROR</p>}

      {isLoading ? (
        <p className="listing-view-loading-message">LOADING</p>
      ) : (
        <List className={classes.publicationList}>
          {publicationList.map(getPublicationListItem)}
        </List>
      )}
    </React.Fragment>
  );
}

export default ListingView;
