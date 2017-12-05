import { combineReducers } from 'redux'
import {
  CATEGORIES_FETCH_DATA_SUCCESS,
  POSTS_FETCH_DATA_SUCCESS,
  POST_FETCH_DATA_SUCCESS,
  VOTE_UPDOWN_SUCCESS,
  ADD_POST_DATA_SUCCESS,
  EDIT_POST_SUCCESS,
  COMMENTS_FETCH_DATA_SUCCESS,
  COMMENT_VOTE_UPDOWN_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  COMMENT_FETCH_DATA_SUCCESS,
  DETAIL_VOTE_UPDOWN_SUCCESS,
  ADD_COMMENT_DATA_SUCCESS
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
      return action.payload.data;
    case VOTE_UPDOWN_SUCCESS :
      return state.map((post) => {
          if ( post.id === action.payload.data.id ) return action.payload.data;
          else return post;
        })
    case ADD_POST_DATA_SUCCESS:
      return [...state, action.payload.data]
    default:
      return state;
    }
}

function post (state = {}, action) {
  switch (action.type) {
    case POST_FETCH_DATA_SUCCESS :
    case DETAIL_VOTE_UPDOWN_SUCCESS:
    case EDIT_POST_SUCCESS:
      return action.payload.data
    default :
      return state
  }
}

function comments (state = [], action) {
  switch (action.type) {
    case COMMENTS_FETCH_DATA_SUCCESS :
      return action.payload.data;
    case ADD_COMMENT_DATA_SUCCESS:
      return [...state, action.payload.data]
    case COMMENT_VOTE_UPDOWN_SUCCESS:
    case EDIT_COMMENT_SUCCESS:
      return state.map((comment) => {
          if ( comment.id === action.payload.data.id ) return action.payload.data;
          else return comment;
        })
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
//DELETE_COMMENT_SUCCESS
function commentupdownvote(state = {}, action) {
  if ( action.type === COMMENT_VOTE_UPDOWN_SUCCESS ) {
    return action.payload.data;
  }

  return state;
}

export default combineReducers({
  categories,
  posts,
  post,
  comments,
  comment
})
