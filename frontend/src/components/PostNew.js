import React, { Component } from 'react';
import DisplayCategories from './DisplayCategories';
import { NavLink } from 'react-router-dom';
import uuid from 'uuid/v4';


class PostNew extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      categories: [],
	      title: '',
	      author: '',
	      body: '',
	      category: ''
	    };
	    this.handleSubmit = this.handleSubmit.bind(this);
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
	handleSubmit(e) {
		e.preventDefault();
		
		let formData = {
			id: uuid(),
			timestamp: Date.now(),
			title: this.state.title,
			body: this.state.body,
			author: this.state.author,
			category: this.state.category,
			voteScore: 1,
			deleted: false
		}
		// Send the form data.
		  var xmlhttp = new XMLHttpRequest();
		  var _this = this;
		  xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState === 4) {
		      var response = JSON.parse(xmlhttp.responseText);
		      if (xmlhttp.status === 200 && response.status === 'OK') {
		        _this.setState({ type: 'success', message: 'We have received your message and will get in touch shortly. Thanks!' });
		      }
		      else {
		        _this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later or send us an email at info@example.com.' });
		      }
		    }
		  };
		  xmlhttp.open('POST', 'http://localhost:3001/posts', true);
		  xmlhttp.setRequestHeader('Content-type', 'application/json');
		  xmlhttp.setRequestHeader('Authorization', 'readable');
		  xmlhttp.send(JSON.stringify(formData));
		
	}
	render() {
		return (
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
						 						<div className="column rendered-example collections-form-variations-form-example-inverted">
													<div className="ui inverted segment">
														<form className="ui inverted form" onSubmit={this.handleSubmit}>

																<div className="field">
																	<label>Title</label>
																	<div className="ui input"><input type="text" placeholder="Title" onChange={ (e) => this.setState({ title: e.target.value }) } /></div>
																</div>
																<div className="field">
																	<label>Author</label>
																	<div className="ui input"><input type="text" placeholder="Author" onChange={ (e) => this.setState({ author: e.target.value }) } /></div>
																</div>
																<div className="field">
																	<label>Post Body</label>
																	<div className="ui input"><input type="text" placeholder="Post Body" onChange={ (e) => this.setState({ body: e.target.value }) } /></div>
																</div>
																<div className="field">
																	<label>Category</label>
																	<select onChange={ (e) => this.setState({ category: e.target.value }) }>
																		<option value="">Select category</option>
																		{
																			this.state.categories.map((category) => (
																					<option key={category.name} value={category.name}>{category.name}</option>											
																			))
																		}
																	</select>
																</div>
															<button type="submit" className="ui button">Submit</button>
														</form>
													</div>
						 						</div>
						          </div>
						        </div>
						      </div>
		)
	}
}

export default PostNew;