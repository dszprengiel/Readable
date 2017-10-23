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
			<ul>
				{
					this.state.categories.map((category) => (
						<li>
							<NavLink
							    to={category.path === 'SHOW_ALL' ? '/' : `/${ category.path }`}
							    activeStyle={{
							      textDecoration: 'none',
							      color: 'black'
							    }}
							  >
							  {category.name}
							</NavLink>
						</li>
					))
				}
			</ul>
		)
	}
}

export default DisplayCategories;