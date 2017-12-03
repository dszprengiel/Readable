import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllCategories } from '../actions';

class DisplayCategories extends Component {
	componentDidMount() {
      this.props.fetchData();
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
								    to={`/${ category.path }/`}
								    className='ui button huge'
								    isActive={()=>this.props.cat === category.path ? true : false}
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

const mapStateToProps = ({categories}, ownProps) => {
	return {
		categories,
		cat: ownProps.cat
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchAllCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCategories);