import React, { Component } from 'react';
import DisplayCategories from './DisplayCategories';
import Posts from './Posts'
import { NavLink } from 'react-router-dom';

export default Category = () => {
  return return (
      <div>
        <div className="ui inverted vertical center aligned segment header-wrapper">
          <div className="ui container">
            <div className="ui large inverted pointing secondary menu">
              <NavLink
                  to='/'
                  isActive={(match, location) => {if(match.url === '/' && match.isExact) return true;}}
                  activeClassName="active item"
                  className="item"
                >
                Home
              </NavLink>
              <NavLink
                  to='/post/new'
                  //isActive={(match, location) => {if(match.url === '/post/new' && match.isExact) return true;}}
                  activeClassName="active item"
                  className="item"
                >
                Add a Post
              </NavLink>
            </div>
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