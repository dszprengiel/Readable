import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class DisplayCategories extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      categories: []
	    };
	}
	componentDidMount() {
	  fetch(
	      'http://localhost:3001/categories',
	      {
	          headers: { 'Authorization': 'readable', 'mode': 'cors' }
	      }
	  ).then((response) => {if (response.ok) {return response.json();}})
	  .then((data) => { this.setState({categories: data.categories})});
	}
	render() {
		return (
			<div>
				<h3 className="heading">Categories</h3>
				<div className="ui vertical buttons">
					{
						this.state.categories.map((category) => (

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

export default DisplayCategories;