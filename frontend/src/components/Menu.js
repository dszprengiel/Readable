import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ReactModal from 'react-modal';
import uuid from 'uuid/v4';

class Menu extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	newPostModalOpen: false,
	      categories: [],
	      title: '',
	      author: '',
	      body: '',
	      category: '',
	      type: '',
	      message: ''
	    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	}
	closeNewPostModal = () => {
		this.setState({
			newPostModalOpen: false
		})
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
		      if (xmlhttp.status === 200 && xmlhttp.statusText === 'OK') {
		        _this.setState({ type: 'success', message: 'The post has been submitted. Thanks!' });
		        //e.target.classList.add('success');
		      }
		      else {
		        _this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
		      }
		    }
		  };
		  xmlhttp.open('POST', 'http://localhost:3001/posts', true);
		  xmlhttp.setRequestHeader('Content-type', 'application/json');
		  xmlhttp.setRequestHeader('Authorization', 'readable');
		  xmlhttp.send(JSON.stringify(formData));
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
		const { newPostModalOpen } = this.state
		return (
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
			      to='#'
			      //isActive={(match, location) => {if(match.url === '/post/new' && match.isExact) return true;}}
			      activeClassName="active item"
			      className="item"
			      onClick={ () => {this.setState({newPostModalOpen: true})} }
			    >
			    Add a Post
			  </NavLink>
			  <ReactModal
          className='modal'
          overlayClassName='overlay'
          isOpen={newPostModalOpen}
          onRequestClose={this.closeNewPostModal}
          contentLabel='Modal'
        >
        	          <div className="twelve wide computer sixteen wide mobile column">
        	 						<div className="column rendered-example collections-form-variations-form-example-inverted">
        								<div className="ui inverted segment">
        									<form className="ui inverted form" onSubmit={this.handleSubmit}>
        											{
        												this.state.type === 'success' ?

        													<div className="ui success message">
        														<div className="content">
        															<div className="header">Form Completed</div>
        															<p>You're all signed up for the newsletter</p>
        														</div>
        													</div>

        													: ''
        											
        											}
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
        </ReactModal>
			</div>
		)
	}

}

export default Menu