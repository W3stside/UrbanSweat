//index reducer with combineReducer
import { combineReducers } from 'redux'
//reducers
import categories from './categoryReducer'
import cities from './cityReducer'
import citySquares from './citySquareReducer'
import dataInput from './searchBarReducer'
import hover from './hoverReducer'
import gyms from './gymReducer'
import hamburgerMenu from './hamburgerClickReducer'

export default combineReducers({
  categories,
  cities,
  citySquares,
  dataInput,
  gyms,
  hamburgerMenu
});

//change hover and click state to aphrodite css
