import axios from 'axios';

export const API = 'http://localhost:3001'

export const CATEGORIES_FETCH_DATA_SUCCESS = 'CATEGORIES_FETCH_DATA_SUCCESS'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'
export const POST_FETCH_DATA_SUCCESS = 'POST_FETCH_DATA_SUCCESS'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const POSTS_FETCH_DATA_SUCCESS_TIMESTAMP = 'POSTS_FETCH_DATA_SUCCESS_TIMESTAMP'
export const VOTE_UPDOWN_SUCCESS = 'VOTE_UPDOWN_SUCCESS'
export const ADD_POST_DATA_SUCCESS = 'ADD_POST_DATA_SUCCESS'
export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS'
export const COMMENT_FETCH_DATA_SUCCESS = 'COMMENT_FETCH_DATA_SUCCESS'
export const COMMENT_VOTE_UPDOWN_SUCCESS = 'COMMENT_VOTE_UPDOWN_SUCCESS'
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const ADD_COMMENT_DATA_SUCCESS = 'ADD_COMMENT_DATA_SUCCESS'

//get all posts
export function fetchAllPosts() {
  const url = `${API}/posts`;
  const request = axios.get(url, {
    headers: { 'Authorization': 'readable', 'mode': 'cors' }
  });

  return {
    type: POSTS_FETCH_DATA_SUCCESS,
    payload: request
  }
}
export function fetchAllPostsTimestamp() {
  const url = `${API}/posts`;
  const request = axios.get(url, {
    headers: { 'Authorization': 'readable', 'mode': 'cors' }
  });

  return {
    type: POSTS_FETCH_DATA_SUCCESS_TIMESTAMP,
    payload: request
  }
}

//get post details
export function getPostDetails(id) {
  const url = `${API}/posts/${id}`;
  const request = axios.get(url, {
    headers: { 'Authorization': 'readable', 'mode': 'cors' }
  });

  return {
    type: POST_FETCH_DATA_SUCCESS,
    payload: request
  }
}

//get all categories
export function fetchAllCategories(data) {
  const url = `${API}/categories`;
  const request = axios.get(url, {
    headers: { 'Authorization': 'readable', 'mode': 'cors' }
  });

  return {
    type: CATEGORIES_FETCH_DATA_SUCCESS,
    payload: request
  }
}

// up / down vote
export function upDownVote(id, option) {
  const url = `${API}/posts/${id}`;
  const request = axios.post(url, JSON.stringify({option}), {headers: { 'Authorization': 'readable', 'mode': 'cors', 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }});

  return {
    type: VOTE_UPDOWN_SUCCESS,
    payload: request
  }
}

// create new post
export function addPost(formData) {
  const url = `${API}/posts`;
  const request = axios.post(url, formData, {headers: { 'Authorization': 'readable', 'mode': 'cors', 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }});

  return {
    type: ADD_POST_DATA_SUCCESS,
    payload: request
  }
}

// edit post
export function editPost(id, formData) {
  const url = `${API}/posts/${id}`;
  const request = axios.put(url, formData, {headers: { 'Authorization': 'readable', 'mode': 'cors', 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }});

  return {
    type: ADD_POST_DATA_SUCCESS,
    payload: request
  }
}

//delete post
export function deletePost(id, formData) {
  const url = `${API}/posts/${id}`;
  const request = axios.delete(url, {headers: { 'Authorization': 'readable', 'mode': 'cors', 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }});

  return {
    type: DELETE_POST_SUCCESS,
    payload: request
  }
}

//get all comments for a post
export function getAllComments(postId) {
  const url = `${API}/posts/${postId}/comments`;
  const request = axios.get(url, {
    headers: { 'Authorization': 'readable', 'mode': 'cors' }
  });

  return {
    type: COMMENTS_FETCH_DATA_SUCCESS,
    payload: request
  }
}

export function getSingleComment(id) {
  const url = `${API}/comments/${id}`;
  const request = axios.get(url, {
    headers: { 'Authorization': 'readable', 'mode': 'cors' }
  });

  return {
    type: COMMENT_FETCH_DATA_SUCCESS,
    payload: request
  }
}

// up / down vote for comments
export function upDownCommentVote(id, option) {
  const url = `${API}/comments/${id}`;
  const request = axios.post(url, JSON.stringify({option}), {headers: { 'Authorization': 'readable', 'mode': 'cors', 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }});

  return {
    type: VOTE_UPDOWN_SUCCESS,
    payload: request
  }
}

// edit comment
export function editComment(id, formData) {
  const url = `${API}/comments/${id}`;
  const request = axios.put(url, formData, {headers: { 'Authorization': 'readable', 'mode': 'cors', 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }});

  return {
    type: EDIT_COMMENT_SUCCESS,
    payload: request
  }
}

//delete comment
export function deleteComment(id, formData) {
  const url = `${API}/comments/${id}`;
  const request = axios.delete(url, {headers: { 'Authorization': 'readable', 'mode': 'cors', 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }});

  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: request
  }
}

// create new comment
export function addComment (formData) {
  const url = `${API}/comments`;
  const request = axios.post(url, formData, {headers: { 'Authorization': 'readable', 'mode': 'cors', 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }});

  return {
    type: ADD_COMMENT_DATA_SUCCESS,
    payload: request
  }
}
