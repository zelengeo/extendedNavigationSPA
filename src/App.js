import React, { Component } from 'react';
import './App.scss';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { ROUTE_PATH } from './constants';
import ReaderView from './components/reader_route/ReaderView';
import ListingView from './components/listing_route/ListingView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className={'routerBody'}>
            <Header
              children={[
                <Link to={ROUTE_PATH.HOME}>Home</Link>,
                <Link to={ROUTE_PATH.PUBLICATIONS}>Publications</Link>,
                <Link to={ROUTE_PATH.ABOUT}>About</Link>
              ]}
            />
            <Route exact path={ROUTE_PATH.DEFAULT} component={ReaderView} />
            <Route path={ROUTE_PATH.HOME} component={Home} />
            <Route path={ROUTE_PATH.PUBLICATIONS} component={ListingView} />
            <Route path={ROUTE_PATH.READER + '/:id'} component={ReaderView} />
            <Route path={ROUTE_PATH.ABOUT} component={About} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
