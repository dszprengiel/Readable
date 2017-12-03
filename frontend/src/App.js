import React, { Component } from 'react';
import './App.css';
import DisplayCategories from './components/DisplayCategories';
import Posts from './components/Posts';
import Menu from './components/Menu';
import Header from './components/Header';



class App extends Component {
  render() {
    return (
      <div>
        <div className="ui inverted vertical center aligned segment header-wrapper">
          <div className="ui container">
            <Menu />
          </div>
         <Header />
        </div>
        <div className="ui padded grid">
          <div className="two wide computer sixteen wide mobile column">
              <DisplayCategories cat={this.props.match.params.filter} />
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
