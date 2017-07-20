import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import "babel-polyfill";
//Redux imports
import { compose, applyMiddleware, createStore } from 'redux';
//Redux-Persist
import {persistStore, autoRehydrate} from 'redux-persist'
//Redux Middleware
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
//Reducers
import reducer from './app/reducers';
//Redux Provider
import { Provider } from 'react-redux';

//Styling
import css from './app/css/reactTransitions.css'
import './app/styles/default'

//Components
import App from './app/components/containers/App';
import CityChooser from './app/components/CityChooser';
import EnsureLoggedInContainer from './app/components/containers/EnsureLoggedInContainer';
import GymCatChooser from './app/components/GymCatChooser';
import GymChooser from './app/components/GymChooser';
import GymViewerPage from './app/components/GymViewerPage';
import Home from './app/components/Home';
import ProfileContainer from './app/components/Profile/ProfileContainer';
import Profile from './app/components/Profile/Profile';

//Still testing
import RouteTransition from './app/components/Containers/RouteTransition'

//Auth Components
import Login from './app/components/Registration/Login';
import Register from './app/components/Registration/Register';

//Whitelisted Reducer (Users)
import users from './app/reducers/userReducer'

const middleware = applyMiddleware( thunk, createLogger() );
const store = createStore( reducer, undefined, compose(middleware, autoRehydrate()) );

//Start persistence
persistStore(store, {whitelist: ['users']}, () => {
    console.log('Rehydration complete');
});

//Top level render
render((
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
), document.getElementById('root'))
