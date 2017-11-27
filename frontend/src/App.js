import React, { Component } from 'react';
import './App.css';
import DisplayCategories from './components/DisplayCategories';
import Posts from './components/Posts';
import Menu from './components/Menu';

class App extends Component {
  render() {
    return (
      <div>
        <div className="ui inverted vertical center aligned segment header-wrapper">
          <div className="ui container">
            <Menu />
          </div>
          <div className="ui text container">
            <h1 className="ui inverted header header-1">Readable</h1>
            <h2 className="ui inverted header header-2">Read whatever you want when you want to.</h2>
          </div>
        </div>
        <div className="ui padded grid">
          <div className="two wide computer sixteen wide mobile column">
              <DisplayCategories />
          </div>
          <div className="twelve wide computer sixteen wide mobile column">
              <Posts cat={this.props.match.params.filter} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
