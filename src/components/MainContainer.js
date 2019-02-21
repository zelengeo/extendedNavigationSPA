import React, { Component } from 'react';
import UserEventHandler from '../utils/UserEventHandler';

import logo1 from '../logo1.svg';
import logo2 from '../logo2.svg';
import logo3 from '../logo3.svg';
import logo4 from '../logo4.svg';
import logo5 from '../logo5.svg';
import logo6 from '../logo6.svg';
import logo_ from '../logo_.svg';

const MOVE_MAP = {
  ArrowLeft: -1,
  KeyA: -1,
  ArrowRight: 1,
  KeyD: 1,
  ArrowUp: -3,
  KeyW: -3,
  ArrowDown: 3,
  KeyS: 3
};

class MainContainer extends Component {
  constructor(props) {
    super(props);
    // Instances
    this._arrowKeyPressEventHandler = new UserEventHandler('keydown', event => {
      if (MOVE_MAP.hasOwnProperty(event.code)) {
        event.preventDefault();
        this._setNextPosition(MOVE_MAP[event.code]);
      }
    });
    // Functions
    this._setNextPosition = this._setNextPosition.bind(this);
    // Initial to-do's
    // State
    this.state = {
      chosenLogoPos: 0,
      logoList: [logo_, logo1, logo2, logo3, logo4, logo5, logo6]
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
  _setNextPosition(move) {
    this.setState(prevState => {
      let nextPos = prevState.chosenLogoPos + move;
      if (nextPos >= prevState.logoList.length) {
        nextPos -= prevState.logoList.length;
      } else if (nextPos < 0) {
        nextPos += prevState.logoList.length;
      }
      return { ...prevState, chosenLogoPos: nextPos };
    });
  }

  render() {
    return (
      <div className={'mainContainer'}>
        <div className={'elements'}>
          {this.state.logoList.map((logo, index) => (
            <img
              onClick={() =>
                this.setState(prevState => ({
                  ...prevState,
                  chosenLogoPos: index
                }))
              }
              key={`logo_${index}`}
              src={logo}
              className={`logoElement ${
                this.state.chosenLogoPos === index ? 'focusedElement' : ''
              }`}
              alt="logo"
            />
          ))}
        </div>
        <div className={'selectedElement'}>
          <p>"Selected field"</p>
          <div className={'selectedImgBorder'}>
            <img
              id={'selectedLogo'}
              src={this.state.logoList[this.state.chosenLogoPos]}
              alt={'logo'}
            />
          </div>
        </div>
      </div>
    );
  }
}

export { MainContainer };
