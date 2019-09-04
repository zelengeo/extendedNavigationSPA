import React from 'react';
import PropTypes from 'prop-types';
import ReaderView from './ReaderView';
import DataModel from '../../utils/DataModel';
import { useQuery } from '@apollo/react-hooks';
import { getWholePublication } from '../listing_route/queries';

function ReaderRouteView({ match }) {
  console.log(match);

  const { loading, error, data } = useQuery(getWholePublication(match.params.id));
  // match.params.id = id prop
  return error ? (
    <p className="listing-view-error-message">ERROR</p>
  ) : loading ? (
    <p className="listing-view-loading-message">LOADING</p>
  ) : (
    <ReaderView dataModel={new DataModel(data)} />
  );
}
ReaderRouteView.defaultProps = {
  match: { params: { id: '_id' } }
};

ReaderRouteView.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    params: PropTypes.object
  })
};

export default ReaderRouteView;
