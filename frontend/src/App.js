import React, { Component } from 'react';
import './App.css';
import DisplayCategories from './components/DisplayCategories';
import { NavLink } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <div className="ui inverted vertical center aligned segment header-wrapper">
          <div className="ui container">
            <div className="ui large inverted pointing secondary menu">
              <NavLink
                  to='/'
                  activeClassName="active item"
                >
                Home
              </NavLink>
            </div>
          </div>
          <div className="ui text container">
            <h1 className="ui inverted header header-1">Readable</h1>
            <h2 className="ui inverted header header-2">Read whatever you want when you want to.</h2>
          </div>
        </div>
        <div className="ui grid">
          <div className="four wide column">
            <DisplayCategories />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
