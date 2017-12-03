import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllPosts, fetchAllPostsTimestamp, upDownVote } from '../actions';

class Posts extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      sort: 'score',
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
	upVote(id) {
		this.props.vote(id, 'upVote');
		if ( this.state.sort === 'score' ) this.props.fetchData();
		else this.props.fetchDataTimestamp();
	}
	downVote(id) {
		this.props.vote(id, 'downVote');
		if ( this.state.sort === 'score' ) this.props.fetchData();
		else this.props.fetchDataTimestamp();
	}
	sortByScore = (e) => {
		if (e) e.preventDefault();
		this.props.fetchData();
		this.setState({sort: 'score'})
	}
	sortByTimestamp = (e) => {
		e.preventDefault();
		if ( this.state.sort === 'timestamp' ) return;
		this.props.fetchDataTimestamp();
		this.setState({sort: 'timestamp'})
	}
	render() {
		return (
			<div>
				<h3 className="heading">Posts <span className="sorting">Sort by: <a onClick={(e) => this.sortByScore(e)} className={this.state.sort === 'score' ? 'active': ''}>score</a>, <a onClick={(e) => this.sortByTimestamp(e)} className={this.state.sort === 'timestamp' ? 'active': ''}>timestamp</a></span></h3>
				<div className="ui cards">
					{
						this.props.posts.filter(post => {
							return this.props.cat ? this.props.cat === post.category : post;
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
										<NavLink
										    to={`/${ post.category }/${ post.id }`}
										  >
										  {post.title} 
										</NavLink>
										<p className="timestamp">Written on {`${new Date(post.timestamp).toLocaleString()}`}</p>
									</div> 
								</div>
							</div>
						))
					}
				</div>
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
        fetchDataTimestamp: () => dispatch(fetchAllPostsTimestamp()),
        vote: (id, options) => dispatch(upDownVote(id, options))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);