import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ReactModal from 'react-modal';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { fetchAllPosts, fetchAllCategories, addPost } from '../actions';

class Menu extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	newPostModalOpen: false,
	      title: '',
	      author: '',
	      body: '',
	      category: '',
	      type: '',
	      message: '',
	      error: false
	    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	}
	closeNewPostModal = () => {
		this.setState({
			newPostModalOpen: false,
			type: '',
			error: false,
			title: '', 
			body: '', 
			author: '', 
			category: ''
		});
		this.props.fetchPosts();
	}
	handleSubmit(e) {
		e.preventDefault();
		const { title, body, author, category } = this.state;
		if ( title === '' || author === '' || body === '' || category === '' ) {
			this.setState({error: true});
			return;
		}

		this.setState({error: false});
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
		this.props.createPost(JSON.stringify(formData));
		this.closeNewPostModal();
	}
	componentDidMount() {
		this.props.fetchData();
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
        									<form className={`ui inverted form ${this.state.error ? 'error' : ''}`} onSubmit={this.handleSubmit}>
        											{
        												this.state.error ?
        												<div className="ui error message">
        													<div className="content">
        														<div className="header">Error</div>
        														<p>Please fill out all off the fields</p>
        													</div>
        												</div>
        												: ''
        											}
        											<div className="field">
        												<label>Title</label>
        												<div className="ui input"><input type="text" placeholder="Title" onChange={ (e) => this.setState({ title: e.target.value }) } value={this.state.title} /></div>
        											</div>
        											<div className="field">
        												<label>Author</label>
        												<div className="ui input"><input type="text" placeholder="Author" onChange={ (e) => this.setState({ author: e.target.value }) } value={this.state.author} /></div>
        											</div>
        											<div className="field">
        												<label>Post Body</label>
        												<div className="ui input"><input type="text" placeholder="Post Body" onChange={ (e) => this.setState({ body: e.target.value }) } value={this.state.body} /></div>
        											</div>
        											<div className="field">
        												<label>Category</label>
        												<select onChange={ (e) => this.setState({ category: e.target.value }) } value={this.state.category}>
        													<option value="">Select category</option>
        													{
        														this.props.categories.map((category) => (
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

const mapStateToProps = ({categories}) => {
	return {
		categories
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
    		fetchPosts: () => dispatch(fetchAllPosts()),
        fetchData: () => dispatch(fetchAllCategories()),
        createPost: (data) => dispatch(addPost(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);