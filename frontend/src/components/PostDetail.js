import React, { Component } from 'react';
import DisplayCategories from './DisplayCategories';
import Menu from './Menu';
import { Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';
import uuid from 'uuid/v4';

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
			editPostModalOpen: true
		})
	}
	getComments = () => {
		fetch(
		    'http://localhost:3001/posts/' + this.props.match.params.id + '/comments',
		    {
		        headers: { 'Authorization': 'readable', 'mode': 'cors' }
		    }
		).then((response) => {if (response.ok) {return response.json();}})
		.then((data) => { 
			this.setState({comments: data});
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
	handleCommentSubmit = (e) => {
			e.preventDefault();
			let formData = {
				id: uuid(),
				timestamp: Date.now(),
				body: this.state.newComment_body,
				author: this.state.newComment_author,
				parentId: this.state.details.id
			};
			fetch(
			    'http://localhost:3001/comments',
			    {
			        headers: { 
			        	'Authorization': 'readable', 
			        	'mode': 'cors',
			        	'Accept': 'application/json, text/plain, */*',
			        	'Content-Type': 'application/json'
			        },
			        method: 'POST',
			        body: JSON.stringify(formData)
			    }
			).then((response) => {if (response.ok) {return response.json();}})
		  .then((data) => { 
		  	this.getComments();
		  });
	}
	componentDidMount() {
	  fetch(
	      'http://localhost:3001/posts/' + this.props.match.params.id,
	      {
	          headers: { 'Authorization': 'readable', 'mode': 'cors' }
	      }
	  ).then((response) => {if (response.ok) {return response.json();}})
	  .then((data) => { 
	  	this.setState({details: data});
	  	if ( data.commentCount > 0 ) this.getComments();
		});

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
			          <div className="ui text container">
			            <h1 className="ui inverted header header-1">Readable</h1>
			            <h2 className="ui inverted header header-2">Read whatever you want when you want to.</h2>
			          </div>
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

			             <hr />
									 <h3>Leave a comment</h3>
			             <form className="ui form" onSubmit={this.handleCommentSubmit}>
			             		<div className="field">
			             			<label>Author</label>
			             			<div className="ui input"><input type="text" placeholder="Author" onChange={ (e) => this.setState({ newComment_author : e.target.value }) } /></div>
			             		</div>
			             		<div className="field">
			             			<label>Comment</label>
			             			<div className="ui input"><input type="text" placeholder="Comment" onChange={ (e) => this.setState({ newComment_body : e.target.value }) } /></div>
			             		</div>
			             		<button type="submit" className="ui button">Submit</button>
			             	</form>
			             	<div id="comments">
			             		<p className="caption">{commentCount} Comments</p>
	  		              <ul>
	  		              {
	  		              	this.state.comments.map((comment) => (
	  		              		<li className="comment" key={comment.id}>
		              		    		<span className="author">{comment.author}</span> <span className="comment-meta">({`${new Date(comment.timestamp).toLocaleString()}`})</span>
		              		    		<p>{comment.body}</p>
		              		    </li>
	  		              	))
	  		              }
	  		              </ul>
  		              </div>
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
			                												<div className="ui input"><input type="text" placeholder="Title" onChange={ (e) => this.setState({ title: e.target.value }) } value={title} /></div>
			                											</div>
			                											<div className="field">
			                												<label>Author</label>
			                												<div className="ui input"><input type="text" placeholder="Author" onChange={ (e) => this.setState({ author: e.target.value }) } value={author} /></div>
			                											</div>
			                											<div className="field">
			                												<label>Post Body</label>
			                												<div className="ui input"><input type="text" placeholder="Post Body" onChange={ (e) => this.setState({ body: e.target.value }) } value={body} /></div>
			                											</div>
			                											<div className="field">
			                												<label>Category</label>
			                												<select onChange={ (e) => this.setState({ category: e.target.value }) } value={category}>
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

export default PostDetail;