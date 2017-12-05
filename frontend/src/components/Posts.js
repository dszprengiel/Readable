import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { fetchAllPosts, editPost, deletePost, upDownVote } from '../actions';

class Posts extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	editPostModalOpen: false,
	      sort: 'score',
	      title: '',
	      body: '',
	      id: '',
	      colors: {
	      	'react': 'orange',
	      	'redux': 'yellow',
	      	'udacity': 'red'
	      }
	    };
	}
	componentDidMount() {
	  this.props.fetchData();
	}
	closeEditPostModal = () => {
		this.setState({
			editPostModalOpen: false
		})
	}
	edit = (title, body, id) => {
		this.setState({
			editPostModalOpen: true,
			title,
			body,
			id
		});
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.editDetails(this.state.id, JSON.stringify({title: this.state.title, body: this.state.body}));
		this.closeEditPostModal();
	}
	sorted = (posts) => {
		const { sort } = this.state;
		return (sort === 'score' ) ? posts.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} ) : posts.sort(function(a,b) {return (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ? 1 : 0);} )
	}
	upVote(id) {
		this.props.vote(id, 'upVote');
	}
	downVote(id) {
		this.props.vote(id, 'downVote');
	}
	sortByScore = (e) => {
		if (e) e.preventDefault();
		this.setState({sort: 'score'})
	}
	sortByTimestamp = (e) => {
		if (e) e.preventDefault();
		this.setState({sort: 'timestamp'})
	}
	delete = (id) => {
		this.props.deletePostDetails(id);
	}
	render() {
		const { posts } = this.props
		const { editPostModalOpen } = this.state;

		return (
			<div>
				<h3 className="heading">Posts <span className="sorting">Sort by: <a onClick={(e) => this.sortByScore(e)} className={this.state.sort === 'score' ? 'active': ''}>score</a>, <a onClick={(e) => this.sortByTimestamp(e)} className={this.state.sort === 'timestamp' ? 'active': ''}>timestamp</a></span></h3>
				<div className="ui cards">
					{
						this.sorted(posts).filter(post => {
							return this.props.cat ? this.props.cat === post.category : post;
						})
						.filter((post) => {
							return !(post.deleted === true)
						})
						.map((post) => (
							<div className={`ui fluid card ${this.state.colors[post.category]}`} key={post.id}>
								<div className="content">
									<div className="midcol unvoted">
										<div className="arrow up" onClick={() => this.upVote(post.id)} data-event-action="upvote" role="button" aria-label="upvote"></div>
										<div className="score unvoted">{post.voteScore}</div>
										<div className="arrow down" onClick={() => this.downVote(post.id)} data-event-action="downvote" role="button" aria-label="downvote"></div>
									</div>
									<div className="header">
										<p className="comment-count">{post.commentCount} Comments</p>
										<p className="actions"><button onClick={() => this.edit(post.title, post.body, post.id)}>Edit</button> | <button onClick={() => this.delete(post.id)}>Delete</button></p>
										<NavLink
										    to={`/${ post.category }/${ post.id }`}
										  >
										  {post.title} 
										</NavLink>
										<p className="author">By {post.author}</p>
										<p className="timestamp">Written on {`${new Date(post.timestamp).toLocaleString()}`}</p>

									</div> 
								</div>
							</div>
						))
					}
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

const mapStateToProps = ({posts}) => {
	return {
		posts
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchAllPosts()),
        editDetails: (id, data) => dispatch(editPost(id, data)),
        deletePostDetails: (id) => dispatch(deletePost(id)),
        vote: (id, options) => dispatch(upDownVote(id, options))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);