import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalWrapper from '../ModalWrapper';
import AddPublicationModalBody from './AddPublicationModalBody';
import './ListingView.scss';

function ListingView() {
  const [publicationList, setPublicationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const addPublication = function() {
    const prevPublicationList = publicationList.slice();
  };

  return (
    <div className={'listing-view'}>
      <ModalWrapper
        entryPoint={function(show) {
          return (
            <button
              onClick={show}
              className="add-publication-modal-open-button"
            >
              Add new publication
            </button>
          );
        }}
        modalBody={function(hide) {
          return <AddPublicationModalBody hide={hide} save={addPublication} />;
        }}
      />

      {isError && <p className={'listing-view-error-message'}>ERROR</p>}

      {isLoading ? (
        <p className={'listing-view-loading-message'}>LOADING</p>
      ) : (
        <ul>
          {publicationList.map(function(item, index) {
            return (
              <li key={index}>
                <Link to={`/reader/${item.id}`}>{item.content}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ListingView;
