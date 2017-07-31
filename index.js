import React, { Component } from 'react';
import { render } from 'react-dom';

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
import reducer from './app/reducers';
//Redux Provider
import { Provider } from 'react-redux';

//Styling
import css from './app/css/reactTransitions.css'
import './app/styles/default'

//Components
import App from './app/components/containers/App';
import CityChooserContainer from './app/components/Containers/CityChooserContainer';
import EnsureLoggedInContainer from './app/components/containers/EnsureLoggedInContainer';
import GymViewContainer from './app/components/Containers/GymViewContainer';
import Home from './app/components/Home';
import ProfileContainer from './app/components/Profile/ProfileContainer';
import Profile from './app/components/Profile/Profile';

//Still testing
import RouteTransition from './app/components/Containers/RouteTransition'
import Map from './app/components/Map/Map'

//Auth Components
import Login from './app/components/Registration/Login';
import Register from './app/components/Registration/Register';

const middleware = applyMiddleware( thunk, createLogger() );
const store = createStore( reducer, undefined, compose(middleware, autoRehydrate()) );

//Start persistence
persistStore(store, {whitelist: ['users']}, () => {
    console.log('Rehydration complete');
});


//Check ENV and log
//!PRODUCTION ? console.log('CURRENTLY IN DEVELOPMENT MODE') : null;

//Top level render
render((
<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            {/* add the routes here */}
            <IndexRoute component={Home}/>
            <Route path="/users/login" component={Login}/>
            <Route path="/users/register" component={Register}/>

            <Route path="/map" component={Map}/>

            {/*LoggedIn only routes*/}
            <Route component={EnsureLoggedInContainer}>
                <Route path="/Profile" component={Profile}/>
                <Route path="/FindYourSpot" component={CityChooserContainer}/>
                <Route path="/GymView/:id" component={GymViewContainer}/>
            </Route>
        </Route>
    </Router>
</ Provider>
), document.getElementById('root'))
