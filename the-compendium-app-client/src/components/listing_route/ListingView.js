import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PublicationListITem from './PublicationListItem';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

function ListingView() {
  const classes = useStyles();
  const [publicationList, setPublicationList] = useState([
    {
      id: 'qwe123456',
      title: 'Application State Management with React',
      tags: ['React', 'js', 'Frontend']
    },
    {
      id: 'wer234567',
      title: 'GraphQL Server Basics: GraphQL Schemas, TypeDefs & Resolvers',
      tags: ['GraphQL', 'js', 'Backend']
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div>
      {isError && <p className="listing-view-error-message">ERROR</p>}

      {isLoading ? (
        <p className="listing-view-loading-message">LOADING</p>
      ) : (
        <ul>
          {publicationList.map(function(item) {
            return <PublicationListITem key={item.id} {...item} />;
          })}
        </ul>
      )}
    </div>
  );
}

export default ListingView;
