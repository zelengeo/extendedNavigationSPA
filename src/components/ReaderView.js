import React, { Component } from 'react';
import { DataModel } from '../utils/DataModel';

import './ReaderView.css';

class ReaderView extends Component {
  constructor(props) {
    super(props);
    this._dataModel = new DataModel();
  }

  render() {
    return (
      <div className={'readerView'}>
        <h1>Reader</h1>
      </div>
    );
  }
}

export { ReaderView };
