import React, { Component } from 'react';
import ReactModal from 'react-modal';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { getAllComments, upDownCommentVote, editComment, deleteComment, addComment, getSingleComment } from '../actions';

class Comments extends Component {
		constructor(props) {
		    super(props);
		    this.state = {
		    	editCommentModalOpen: false,
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
		    	newComment_author: '',
		    	newComment_body: ''
	    	};
		}
	closeEditCommentModal = () => {
		this.setState({
			editCommentModalOpen: false
		})
	}
	deleteComment = (id) => {
		this.props.deleteComment(id);
	}
	editComment = (id) => {
		this.setState({edit_id: id});
		const p = this.props.getComment(id);
		p.then(() => {
			this.setState({edit_body: this.props.comment.body, editCommentModalOpen: true})
		});
	}
	upVoteComment(id) {
		this.props.vote(id, 'upVote');
	}
	downVoteComment(id) {
		this.props.vote(id, 'downVote');
	}
	handleCommentSubmit = (e) => {
			e.preventDefault();
			const { newComment_body, newComment_author } = this.state;
			if ( newComment_body === '' || newComment_author === '' ) {
				this.setState({error: true});
				return;
			}

			let formData = {
				id: uuid(),
				timestamp: Date.now(),
				body: this.state.newComment_body,
				author: this.state.newComment_author,
				parentId: this.props.postId
			};

			this.props.newComment(JSON.stringify(formData));

			this.setState({
				newComment_author: '',
				newComment_body: ''
			});
	}
	
	updateComment = (e) => {
		  e.preventDefault();
		  this.props.editDetails(this.state.edit_id, JSON.stringify({timestamp: Date.now(), body: this.state.edit_body}));
		  this.closeEditCommentModal();
	}
	componentDidMount() {
		this.props.getComments(this.props.postId);
	}
	render() {
		const { editCommentModalOpen } = this.state;
		const { comments } = this.props
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
	     		<p className="caption">{this.props.comments.length} Comments</p>
	        <ul>
	        {
	        	comments
	        		.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} )
	        		.filter((comment) => {
	        			return !(comment.deleted)
	        		})
	        		.map((comment) => (
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

const mapStateToProps = ({comments, comment}, ownProps) => {
	return {
		comments,
		comment,
		count: ownProps.count,
		postId: ownProps.postId
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
    		getComments: (id) => dispatch(getAllComments(id)),
    		vote: (id, options) => dispatch(upDownCommentVote(id, options)),
    		editDetails: (id, data) => dispatch(editComment(id, data)),
    		newComment: (data) => dispatch(addComment(data)),
    		deleteComment: (id) => dispatch(deleteComment(id)),
    		getComment: (id) => dispatch(getSingleComment(id))
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);