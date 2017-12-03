import { combineReducers } from 'redux'
import {
  CATEGORIES_FETCH_DATA_SUCCESS,
  POSTS_FETCH_DATA_SUCCESS,
  POST_FETCH_DATA_SUCCESS,
  POSTS_FETCH_DATA_SUCCESS_TIMESTAMP,
  VOTE_UPDOWN_SUCCESS,
  ADD_POST_DATA_SUCCESS,
  EDIT_POST_SUCCESS,
  COMMENTS_FETCH_DATA_SUCCESS,
  COMMENT_VOTE_UPDOWN_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  COMMENT_FETCH_DATA_SUCCESS
} from '../actions'

function categories (state = [], action) {
  switch (action.type) {
    case CATEGORIES_FETCH_DATA_SUCCESS :
      return action.payload.data.categories
    default :
      return state
  }
}

function posts (state = [], action) {
  switch (action.type) {
    case POSTS_FETCH_DATA_SUCCESS :
      return action.payload.data.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
    case POSTS_FETCH_DATA_SUCCESS_TIMESTAMP :
      return action.payload.data.sort(function(a,b) {return (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ? 1 : 0);} )
    default:
      return state;
    }
}

function post (state = {}, action) {
  switch (action.type) {
    case POST_FETCH_DATA_SUCCESS :
      return action.payload.data
    default :
      return state
  }
}

function editpost (state = {}, action) {
  switch (action.type) {
    case EDIT_POST_SUCCESS:
      return action.payload.data
    default :
      return state
  }
}

function updownvote(state = {}, action) {
  if ( action.type === VOTE_UPDOWN_SUCCESS ) {
    return action.payload.data;
  }

  return state;
}

function addpost(state = [], action) {

  if ( action.type === ADD_POST_DATA_SUCCESS ) {
    return action.payload.data
  }

  return state;
}

function comments (state = [], action) {
  switch (action.type) {
    case COMMENTS_FETCH_DATA_SUCCESS :
      return action.payload.data.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
    default:
      return state;
    }
}

function comment (state = {}, action) {
  switch (action.type) {
    case COMMENT_FETCH_DATA_SUCCESS :
      return action.payload.data;
    default:
      return state;
    }
}

function commentupdownvote(state = {}, action) {
  if ( action.type === COMMENT_VOTE_UPDOWN_SUCCESS ) {
    return action.payload.data;
  }

  return state;
}

function editcomment (state = {}, action) {
  switch (action.type) {
    case EDIT_COMMENT_SUCCESS:
      return action.payload.data
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  post,
  updownvote,
  addpost,
  editpost,
  comments,
  comment,
  commentupdownvote,
  editcomment
})
