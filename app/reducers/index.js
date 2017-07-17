//index reducer with combineReducer
import {combineReducers} from 'redux'
//reducers
import categories from './categoryReducer'
import cities from './cityReducer'
import citySquares from './citySquareReducer'
import dataInput from './searchBarReducer'
import filteredData from './filteredDataReducer'
import hover from './hoverReducer'
import gyms from './gymReducer'
import gymInstances from './gymInstanceReducer'
import hamburgerMenu from './hamburgerClickReducer'
import slideShow from './slideShowReducer'
import users from './userReducer'

export default combineReducers({
    categories,
    cities,
    citySquares,
    dataInput,
    filteredData,
    gyms,
    gymInstances,
    hamburgerMenu,
    slideShow,
    users,
});
