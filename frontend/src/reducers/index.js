import { combineReducers } from 'redux'
import {
  ADD_RECIPE,
  REMOVE_FROM_CALENDAR,
  CATEGORIES_FETCH_DATA_SUCCESS
} from '../actions'

function categories (state = [], action) {
  switch (action.type) {
    case CATEGORIES_FETCH_DATA_SUCCESS :
      return action.categories
    default :
      return state
  }
}



function calendar (state = {}, action) {
  const { day, recipe, meal } = action

  switch (action.type) {
    case ADD_RECIPE :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: recipe.label,
        }
      }
    case REMOVE_FROM_CALENDAR :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null,
        }
      }
    default :
      return state
  }
}

export default combineReducers({
  categories,
  calendar,
})
