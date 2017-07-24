//REACT
import React, { Component } from 'react';
import { render } from 'react-dom';

//REACT HOT LOAD
import { AppContainer } from 'react-hot-loader'

//ROUTER 3.0
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
//babel-polyfill
import "babel-polyfill";
//Redux imports
import { compose, applyMiddleware, createStore } from 'redux';
//Redux-Persist
import {persistStore, autoRehydrate} from 'redux-persist'
//Redux Middleware
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
//Reducers
import reducer from '../../reducers';
//Redux Provider
import { Provider } from 'react-redux';

//Styling
//import css from '../../css/reactTransitions.css'
import '../../styles/default'
//Container Components
import App from './App';
import EnsureLoggedInContainer from './EnsureLoggedInContainer';
import ProfileContainer from '../Profile/ProfileContainer';
import Profile from '../Profile/Profile';

//Components
import CityChooser from '../CityChooser';
import GymCatChooser from '../GymCatChooser';
import GymChooser from '../GymChooser';
import GymViewerPage from '../GymViewerPage';
import Home from '../Home';

//Still testing
import RouteTransition from './RouteTransition'

//Auth Components
import Login from '../Registration/Login';
import Register from '../Registration/Register';

const middleware = applyMiddleware( thunk, createLogger() );
const store = createStore( reducer, undefined, compose(middleware, autoRehydrate()) );

//Start persistence
persistStore(store, {whitelist: ['users']}, () => {
    console.log('Rehydration complete');
});


export default class Root extends Component {

    //Top level render
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={App}>
                        {/* add the routes here */}
                        <IndexRoute component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>

                        {/*LoggedIn only routes*/}
                        <Route component={EnsureLoggedInContainer}>
                            <Route path="/Profile" component={Profile}/>
                            <Route path="/FindYourSpot" component={CityChooser}/>
                            <Route path="/GymView/:id" component={GymViewerPage}/>
                        </Route>
                    </Route>
                </Router>
            </ Provider>
        )
    }
}
