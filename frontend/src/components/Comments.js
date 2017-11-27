import React, { Component } from 'react';
import ReactModal from 'react-modal';
import uuid from 'uuid/v4';

class Comments extends Component {
		constructor(props) {
		    super(props);
		    this.state = {
		    	editCommentModalOpen: false,
		    	categories: [],
		    	title: '',
		    	author: '',
		    	body: '',
		    	category: '',
		    	type: '',
		    	message: '',
		    	id: '',
		    	redirect: false,
		    	edit_body: '',
		    	edit_id: '',
		    	comments: [],
		    	newComment_author: '',
		    	newComment_body: '',
	    	};
		}
	closeEditCommentModal = () => {
		this.setState({
			editCommentModalOpen: false
		})
	}
	deleteComment = (id) => {
		fetch(
		    'http://localhost:3001/comments/' + id,
		    {
		        headers: { 'Authorization': 'readable', 'mode': 'cors' },
		        method: 'DELETE'
		    }
		).then((response) => {if (response.ok) {return response.json();}})
		 .then((data) => { 
		 	let comments = this.state.comments;
		 	comments = comments.filter((c) => {
		 		return c.id !== data.id;
		 	});
		 	this.setState({comments})
		 });
	}
	editComment = (id) => {
		this.setState({edit_id: id});
		fetch(
		    'http://localhost:3001/comments/' + id,
		    {
		        headers: { 'Authorization': 'readable', 'mode': 'cors' },
		        method: 'GET'
		    }
		).then((response) => {if (response.ok) {return response.json();}})
		 .then((data) => { 
		 		console.log(data);
		 		this.setState({edit_body: data.body, editCommentModalOpen: true});
		 });
	}
	upVoteComment(id) {
		fetch(
		    'http://localhost:3001/comments/' + id,
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
	  	const items = this.state.comments.map((c) => {
	  		if ( c.id === data.id ) {
	  			return data;
	  		}
	  		else {
	  			return c;
	  		}
	  	});
	  	this.setState({comments: items});
	  	let sorted = this.state.comments.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
	  	this.setState({comments: sorted})

	  	
	  });
	}
	downVoteComment(id) {
		fetch(
		    'http://localhost:3001/comments/' + id,
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
	  	const items = this.state.comments.map((c) => {
  		if ( c.id === data.id ) {
  			return data;
  		}
  		else {
  			return c;
  		}
  	});
  	this.setState({comments: items});
  	let sorted = this.state.comments.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
  	this.setState({comments: sorted})
	  });
	}
	handleCommentSubmit = (e) => {
			e.preventDefault();
			let formData = {
				id: uuid(),
				timestamp: Date.now(),
				body: this.state.newComment_body,
				author: this.state.newComment_author,
				parentId: this.props.postId
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
		  	
		  	this.setState({
		  		newComment_author: '',
		  		newComment_body: ''
		  	});
		  	this.getComments();
		  });
	}
	getComments = () => {
		fetch(
		    'http://localhost:3001/posts/' + this.props.postId + '/comments',
		    {
		        headers: { 'Authorization': 'readable', 'mode': 'cors' }
		    }
		).then((response) => {if (response.ok) {return response.json();}})
		.then((data) => { 
			this.setState({comments: data});
			let sorted = this.state.comments.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
			this.setState({comments: sorted})
		});
	}
	updateComment = (e) => {
		  e.preventDefault();
		  console.log(this.state.edit_body)
			fetch(
			    'http://localhost:3001/comments/' + this.state.edit_id,
			    {
			        headers: { 
			        	'Authorization': 'readable', 
			        	'mode': 'cors',
			        	'Accept': 'application/json, text/plain, */*',
			        	'Content-Type': 'application/json'
			        },
			        method: 'PUT',
			        body: JSON.stringify({timestamp: Date.now(), body: this.state.edit_body})
			    }
			).then((response) => {if (response.ok) {return response.json();}})
		  .then((data) => { 
		  	this.setState({
		  		editCommentModalOpen: false
		  	})
		  	this.getComments();
		  });
	}
	componentDidMount() {
		this.getComments();
	}
	render() {
		const { editCommentModalOpen } = this.state;
		return (
			<div>
	     <hr />
			 <h3>Leave a comment</h3>
	     <form className="ui form" onSubmit={this.handleCommentSubmit}>
	     		<div className="field">
	     			<label>Author</label>
	     			<div className="ui input"><input type="text" placeholder="Author" onChange={ (e) => this.setState({ newComment_author : e.target.value }) } value={this.state.newComment_author} /></div>
	     		</div>
	     		<div className="field">
	     			<label>Comment</label>
	     			<div className="ui input"><input type="text" placeholder="Comment" onChange={ (e) => this.setState({ newComment_body : e.target.value }) } value={this.state.newComment_body} /></div>
	     		</div>
	     		<button type="submit" className="ui button">Submit</button>
	     	</form>
	     	<div id="comments">
	     		<p className="caption">{this.state.comments.length} Comments</p>
	        <ul>
	        {
	        	this.state.comments.map((comment) => (
	        		<li className="comment" key={comment.id}>
 		             <div className="midcol unvoted">
										<div className="arrow up" onClick={() => this.upVoteComment(comment.id)} data-event-action="upvote" role="button" aria-label="upvote"></div>
										<div className="score unvoted">{comment.voteScore}</div>
										<div className="arrow down" onClick={() => this.downVoteComment(comment.id)} data-event-action="downvote" role="button" aria-label="downvote"></div>
									</div>
	    		    		<span className="author">{comment.author}</span> <span className="comment-meta">({`${new Date(comment.timestamp).toLocaleString()}`})</span> <button onClick={(e) => this.editComment(comment.id)}>Edit</button> | <button onClick={(e) => this.deleteComment(comment.id)}>Delete</button>
	    		    		<p>{comment.body}</p>
	    		    </li>
	        	))
	        }
	        </ul>
      	</div>
      				  <ReactModal
      	          className='modal'
      	          overlayClassName='overlay'
      	          isOpen={editCommentModalOpen}
      	          onRequestClose={this.closeEditCommentModal}
      	          contentLabel='Modal'
      	        >
      	        	          <div className="twelve wide computer sixteen wide mobile column">
      	        	 						<div className="column rendered-example collections-form-variations-form-example-inverted">
      	        								<div className="ui inverted segment">
      	        									<form className="ui inverted form" onSubmit={this.updateComment}>
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
      	        												<label>Comment</label>
      	        												<div className="ui input"><input type="text" placeholder="Comment" onChange={ (e) => this.setState({ edit_body: e.target.value }) } value={this.state.edit_body} /></div>
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

export default Comments