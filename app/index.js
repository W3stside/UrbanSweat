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
import reducer from './reducers';
//Redux Provider
import { Provider } from 'react-redux';

//Styling
import css from './css/reactTransitions.css'
import './styles/default'

//Components
import App from './components/containers/App';
import CityChooser from './components/CityChooser';
import EnsureLoggedInContainer from './components/containers/EnsureLoggedInContainer';
import GymCatChooser from './components/GymCatChooser';
import GymChooser from './components/GymChooser';
import GymViewerPage from './components/GymViewerPage';
import Home from './components/Home';
import ProfileContainer from './components/Profile/ProfileContainer';
import Profile from './components/Profile/Profile';

//Still testing
import RouteTransition from './components/Containers/RouteTransition'

//Auth Components
import Login from './components/Registration/Login';
import Register from './components/Registration/Register';

//Whitelisted Reducer (Users)
import users from './reducers/userReducer'

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
