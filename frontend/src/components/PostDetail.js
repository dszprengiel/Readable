import React, { Component } from 'react';
import DisplayCategories from './DisplayCategories';
import Menu from './Menu';
import Comments from './Comments';
import Header from './Header';
import { Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';

class PostDetail extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	editPostModalOpen: false,
	    	categories: [],
	    	title: '',
	    	author: '',
	    	body: '',
	    	category: '',
	    	type: '',
	    	message: '',
	    	id: '',
	    	redirect: false,
	    	comments: [],
	    	newComment_author: '',
	    	newComment_body: '',
    		details: {
    			title: '',
    			author: '',
    			body: '',
    			voteScore: '',
    			timestamp: '',
    			category: '',
    			id: '',
    			commentCount: ''
    		}
    	};
	}
	closeEditPostModal = () => {
		this.setState({
			editPostModalOpen: false
		})
	}
	edit = () => {
		this.setState({
			editPostModalOpen: true,
			title: this.state.details.title,
			body: this.state.details.body
		});
	}
	delete = () => {
		fetch(
		    'http://localhost:3001/posts/' + this.state.details.id,
		    {
		        headers: { 'Authorization': 'readable', 'mode': 'cors' },
		        method: 'DELETE'
		    }
		).then((response) => {if (response.ok) {this.setState({redirect: true})}});
	}
	upVote(id) {
		fetch(
		    'http://localhost:3001/posts/' + id,
		    {
		        headers: { 
		        	'Authorization': 'readable', 
		        	'mode': 'cors',
		        	'Accept': 'application/json, text/plain, */*',
		        	'Content-Type': 'application/json'
		        },
		        method: 'POST',
		        body: JSON.stringify({option: 'upVote'})
		    }
		).then((response) => {if (response.ok) {return response.json();}})
	  .then((data) => { 
	  	this.getPostDetails();
	  	
	  	
	  });
	}
	downVote(id) {
		fetch(
		    'http://localhost:3001/posts/' + id,
		    {
		        headers: { 
		        	'Authorization': 'readable', 
		        	'mode': 'cors',
		        	'Accept': 'application/json, text/plain, */*',
		        	'Content-Type': 'application/json'
		        },
		        method: 'POST',
		        body: JSON.stringify({option: 'downVote'})
		    }
		).then((response) => {if (response.ok) {return response.json();}})
	  .then((data) => { 
	  	this.getPostDetails();
	  });
	}
	getPostDetails = () => {
		  fetch(
		      'http://localhost:3001/posts/' + this.props.match.params.id,
		      {
		          headers: { 'Authorization': 'readable', 'mode': 'cors' }
		      }
		  ).then((response) => {if (response.ok) {return response.json();}})
		  .then((data) => { 
		  	this.setState({details: data});
		  	//if ( data.commentCount > 0 ) this.getComments();
			});
	}
	handleSubmit = (e) => {
		e.preventDefault();
			fetch(
			    'http://localhost:3001/posts/' + this.state.details.id,
			    {
			        headers: { 
			        	'Authorization': 'readable', 
			        	'mode': 'cors',
			        	'Accept': 'application/json, text/plain, */*',
			        	'Content-Type': 'application/json'
			        },
			        method: 'PUT',
			        body: JSON.stringify({title: this.state.title, body: this.state.body})
			    }
			).then((response) => {if (response.ok) {return response.json();}})
		  .then((data) => { 
		  	this.setState({
		  		details: data,
		  		editPostModalOpen: false
		  	})

		  });
	}
	componentDidMount() {
	  
	  this.getPostDetails();

	  fetch(
	      'http://localhost:3001/categories',
	      {
	          headers: { 'Authorization': 'readable', 'mode': 'cors' }
	      }
	  ).then((response) => {if (response.ok) {return response.json();}})
	  .then((data) => { this.setState({categories: data.categories})});

	}
	render() {
		const { title, body, author, voteScore, timestamp, category, id, commentCount } = this.state.details;
		const readable_date = new Date(timestamp).toLocaleString();
		const { editPostModalOpen } = this.state;
		const { redirect } = this.state;

   if (redirect) {
     return <Redirect to={`/${ category }/`} />;
   }
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
			              <DisplayCategories />
			          </div>
			          <div className="twelve wide computer sixteen wide mobile column postDetail">
	 		             <div className="midcol unvoted">
											<div className="arrow up" onClick={() => this.upVote(id)} data-event-action="upvote" role="button" aria-label="upvote"></div>
											<div className="score unvoted">{voteScore}</div>
											<div className="arrow down" onClick={() => this.downVote(id)} data-event-action="downvote" role="button" aria-label="downvote"></div>
										</div>
			             <h3 className="postTitle">{ title } <button className="ui teal button" onClick={this.edit}>Edit</button> <button className="ui red button" onClick={this.delete}>Delete</button></h3>
			             <p>Written by { author } on {readable_date}</p>
			             <p>{ body }</p>

			             	<Comments count={commentCount} postId={this.props.match.params.id} />
			          </div>
			        </div>
			        			  <ReactModal
			                  className='modal'
			                  overlayClassName='overlay'
			                  isOpen={editPostModalOpen}
			                  onRequestClose={this.closeEditPostModal}
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
			                												<div className="ui input"><input type="text" placeholder="Title" onChange={ (e) => this.setState({ title: e.target.value }) } value={this.state.title} /></div>
			                											</div>
			                											<div className="field">
			                												<label>Post Body</label>
			                												<div className="ui input"><input type="text" placeholder="Post Body" onChange={ (e) => this.setState({ body: e.target.value }) } value={this.state.body} /></div>
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

export default PostDetail;