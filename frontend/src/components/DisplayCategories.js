import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions';

class DisplayCategories extends Component {
	componentDidMount() {
      this.props.fetchData('http://localhost:3001/categories');
  }
	
	render() {
		return (
			<div>
				<h3 className="heading">Categories</h3>
				<div className="ui vertical buttons">
					{
						this.props.categories.map((category) => (

								<NavLink
										key={category.name}
								    to={category.path === 'SHOW_ALL' ? '/' : `/${ category.path }/`}
								    className='ui button huge'
								    activeStyle={{
								      color: 'white'
								    }}
								    activeClassName='orange'
								  >
								  {category.name}
								</NavLink>
				
						))
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.categories
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCategories);