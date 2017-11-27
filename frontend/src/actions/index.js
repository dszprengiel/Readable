export const CATEGORIES_FETCH_DATA_SUCCESS = 'CATEGORIES_FETCH_DATA_SUCCESS'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'
export const SORT_BY_SCORE = 'SORT_BY_SCORE'
export const SORT_BY_TIMESTAMP = 'SORT_BY_TIMESTAMP'
export const VOTE_POST_FETCH_DATA_SUCCESS = 'VOTE_POST_FETCH_DATA_SUCCESS'

export function categoriesFetchDataSuccess(data) {
  const categories = data.categories;
    return {
        type: 'CATEGORIES_FETCH_DATA_SUCCESS',
        'categories' : categories
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {

        fetch(url,
          {
              headers: { 'Authorization': 'readable', 'mode': 'cors' }
          }
        )
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(categoriesFetchDataSuccess(items)))
    };
}
//get all posts
export function postsFetchDataSuccess(data) {
  return {
      type: 'POSTS_FETCH_DATA_SUCCESS',
      'posts' : data
  };
}

export function postsFetchData() {
    return (dispatch) => {

      fetch(
          'http://localhost:3001/posts',
          {
              headers: { 'Authorization': 'readable', 'mode': 'cors' }
          }
      ).then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
      .then((response) => response.json())
      .then((posts) => dispatch(postsFetchDataSuccess(posts)));
    };
}
//sorting
export function sortedByScore(data) {
  return {
    type: 'SORT_BY_SCORE',
    text: 'posts',
    'posts': data
  }
}
export function sortedByTimestamp(data) {
  return {
    type: 'SORT_BY_TIMESTAMP',
    'posts': data
  }
}

//up down vote
export function changePostVoteSuccess(data) {
  return {
      type: 'VOTE_POST_FETCH_DATA_SUCCESS',
      'post' : data
  };
}
export function upDownVote(id, option) {
  return (dispatch) => {

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
              body: JSON.stringify({option})
          }
      ).then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
      .then((response) => response.json())
      .then((post) => dispatch(changePostVoteSuccess(post)));

  }
}