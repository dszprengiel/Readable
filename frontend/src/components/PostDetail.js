import React, { Component } from 'react';
import DisplayCategories from './DisplayCategories';
import Menu from './Menu';
import Comments from './Comments';
import Header from './Header';
import { Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { getPostDetails, editPost, deletePost, upDownVote } from '../actions';

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
	    	newComment_body: ''
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
			title: this.props.post.title,
			body: this.props.post.body
		});
	}
	delete = () => {
		this.props.deletePostDetails(this.props.post.id);
		this.setState({redirect: true});
	}
	upVote(id) {
		this.props.vote(id, 'upVote');
	}
	downVote(id) {
		this.props.vote(id, 'downVote');
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.editDetails(this.props.post.id, JSON.stringify({title: this.state.title, body: this.state.body}));
		this.closeEditPostModal();
	}
	componentDidMount() {
	  this.props.getPost(this.props.match.params.id);
	}
	render() {
		const { title, body, author, voteScore, timestamp, category, id, commentCount } = this.props.post;
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
			              <DisplayCategories cat={category} />
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

const mapStateToProps = ({post}, ownProps) => {
	return {
		post,
		match: ownProps.match
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
    		getPost: (id) => dispatch(getPostDetails(id)),
    		editDetails: (id, data) => dispatch(editPost(id, data)),
    		deletePostDetails: (id) => dispatch(deletePost(id)),
        vote: (id, options) => dispatch(upDownVote(id, options, true))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);