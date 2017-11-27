import { combineReducers } from 'redux'
import {
  CATEGORIES_FETCH_DATA_SUCCESS,
  POSTS_FETCH_DATA_SUCCESS,
  VOTE_POST_FETCH_DATA_SUCCESS,
  SORT_BY_SCORE,
  SORT_BY_TIMESTAMP
} from '../actions'

function categories (state = [], action) {
  switch (action.type) {
    case CATEGORIES_FETCH_DATA_SUCCESS :
      return action.categories
    default :
      return state
  }
}

function posts (state = [], action) {
  switch (action.type) {
    case POSTS_FETCH_DATA_SUCCESS :
      return action.posts
    default :
      return state
  }
}

function post (state = {}, action) {
  console.log('---post reducer---', state, action)
  switch (action.type) {
    case VOTE_POST_FETCH_DATA_SUCCESS :
      return action.post
    default :
      return state
  }
}

function sortBy (state = [], action) {
  console.log('---sortBy reducer---', state, action)
  switch (action.type) {
    case SORT_BY_SCORE :
      return action.posts.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} )
    case SORT_BY_TIMESTAMP:
      return action.posts.sort(function(a,b) {return (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ? 1 : 0);} )
    default :
      return state
  }
}


export default combineReducers({
  categories,
  posts,
  post,
  sortBy
})
