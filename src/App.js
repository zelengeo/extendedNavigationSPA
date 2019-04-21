import React, { Component } from 'react';
import './App.scss';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { About } from './components/About';
import { Footer } from './components/Footer';
import ReaderView from './components/reader_route_components/ReaderView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className={'routerBody'}>
            <Header
              children={[
                <Link to="/home">Home</Link>,
                <Link to="/reader">Reader</Link>,
                <Link to="/about">About</Link>
              ]}
            />
            <Route exact path="/" component={ReaderView} />
            <Route path="/home" component={Home} />
            <Route path="/reader" component={ReaderView} />
            <Route path="/about" component={About} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
