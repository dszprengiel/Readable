import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { postsFetchData, upDownVote, sortedByScore, sortedByTimestamp } from '../actions';

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
	  /*fetch(
	      'http://localhost:3001/posts',
	      {
	          headers: { 'Authorization': 'readable', 'mode': 'cors' }
	      }
	  ).then((response) => {if (response.ok) {return response.json();}})
	  .then((data) => { 
	  	this.setState({posts: data});
	  	let sorted = this.state.posts.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
	  	this.setState({posts: sorted})
	  });*/
	  this.props.fetchData();
	}
	upVote(id) {
		this.props.voteUpDown(id, 'upVote');
		this.props.fetchData();
	}
	downVote(id) {
		this.props.voteUpDown(id, 'downVote');
		this.props.fetchData();
	}
	sortByScore = (e) => {
		if (e) e.preventDefault();
		this.props.sortScore(this.props.posts);
	}
	sortByTimestamp = (e) => {
		e.preventDefault();
		if ( this.state.sort === 'timestamp' ) return;
		let sorted = this.state.posts.sort(function(a,b) {return (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ? 1 : 0);} );
		this.setState({posts: sorted, sort: 'timestamp'})
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

const mapStateToProps = (state) => {
	return {
		posts: state.posts
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(postsFetchData()),
        voteUpDown: (id, option) => dispatch(upDownVote(id, option)),
        sortScore: (posts) => dispatch(sortedByScore(posts)),
        sortTimestamp: (posts) => dispatch(sortedByTimestamp(posts))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);