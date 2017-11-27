export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'
export const CATEGORIES_FETCH_DATA_SUCCESS = 'CATEGORIES_FETCH_DATA_SUCCESS'

export function addRecipe ({ day, recipe, meal }) {
  return {
    type: ADD_RECIPE,
    recipe,
    day,
    meal,
  }
}

export function removeFromCalendar ({ day, meal }) {
  return {
    type: REMOVE_FROM_CALENDAR,
    day,
    meal,
  }
}

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