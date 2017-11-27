import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Posts extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      posts: [],
	      sort: 'score',
	      colors: {
	      	'react': 'orange',
	      	'redux': 'yellow',
	      	'udacity': 'red'
	      }
	    };
	}
	componentDidMount() {
	  fetch(
	      'http://localhost:3001/posts',
	      {
	          headers: { 'Authorization': 'readable', 'mode': 'cors' }
	      }
	  ).then((response) => {if (response.ok) {return response.json();}})
	  .then((data) => { 
	  	this.setState({posts: data});
	  	let sorted = this.state.posts.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
	  	this.setState({posts: sorted})
	  });

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
	  	const items = this.state.posts.map((p) => {
	  		if ( p.id === data.id ) {
	  			return data;
	  		}
	  		else {
	  			return p;
	  		}
	  	});
	  	this.setState({posts: items});
	  	if ( this.state.sort === 'score' ) {
	  		let sorted = this.state.posts.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
	  		this.setState({posts: sorted})
	  	}
	  	
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
	  	const items = this.state.posts.map((p) => {
	  		if ( p.id === data.id ) {
	  			return data;
	  		}
	  		else {
	  			return p;
	  		}
	  	});
	  	this.setState({posts: items});
	  	if ( this.state.sort === 'score' ) {
	  		let sorted = this.state.posts.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
	  		this.setState({posts: sorted})
	  	}
	  });
	}
	sortByScore = (e) => {
		if (e) e.preventDefault();
		if ( this.state.sort === 'score' ) return;
		let sorted = this.state.posts.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
		console.log(sorted)
		this.setState({posts: sorted, sort: 'score'})
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
						this.state.posts.filter(post => {
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

export default Posts;