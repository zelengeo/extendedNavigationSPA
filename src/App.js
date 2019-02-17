import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { About } from './components/About';
import { Footer } from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className={'routerBody'}>
            <Header
              children={[
                <Link to="/">Home</Link>,
                <Link to="/about">About</Link>
              ]}
            />
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
