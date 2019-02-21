import React, { Component } from 'react';
import { DataModel } from '../utils/DataModel';
import UserEventHandler from '../utils/UserEventHandler';
import { NodeView } from './NodeView';

import './ReaderView.css';

const MOVE_MAP = {
  LEFT: -1,
  RIGHT: 1,
  DOWN: 3,
  UP: -3
};

const KEYBOARD_EVENTS_MOVE_MAP = {
  ArrowLeft: MOVE_MAP.LEFT,
  KeyA: MOVE_MAP.LEFT,
  ArrowRight: MOVE_MAP.RIGHT,
  KeyD: MOVE_MAP.RIGHT,
  ArrowUp: MOVE_MAP.UP,
  KeyW: MOVE_MAP.UP,
  ArrowDown: MOVE_MAP.DOWN,
  KeyS: MOVE_MAP.DOWN
};

class ReaderView extends Component {
  constructor(props) {
    super(props);
    // Instances
    this._dataModel = new DataModel();
    this._arrowKeyPressEventHandler = new UserEventHandler('keydown', event => {
      if (KEYBOARD_EVENTS_MOVE_MAP.hasOwnProperty(event.code)) {
        event.preventDefault();
        this._handleNavigation(KEYBOARD_EVENTS_MOVE_MAP[event.code]);
      }
    });
    // Functions
    this._handleNavigation = this._handleNavigation.bind(this);
    // Initial to-do's
    // State

    this.state = {
      focusedNode: this._dataModel.getRoot()
    };
  }

  // React lifecycle
  componentWillMount() {
    this._arrowKeyPressEventHandler.register();
  }

  componentWillUnmount() {
    this._arrowKeyPressEventHandler.unregister();
  }

  // Interface

  // Private helpers
  _handleNavigation(direction) {
    console.log('NAVIGATION SOON', direction);
  }

  render() {
    return (
      <div className={'readerView'}>
        <h1>Reader</h1>
        <NodeView node={this.state.focusedNode} />
      </div>
    );
  }
}

export { ReaderView };
