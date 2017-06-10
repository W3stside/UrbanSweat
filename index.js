import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import "babel-polyfill";
//Redux imports
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { Provider } from 'react-redux';

//Components
import Home from './components/Home';
import CityChooser from './components/CityChooser';
import GymCatChooser from './components/GymCatChooser';
import GymChooser from './components/GymChooser';
import GymViewerPage from './components/GymViewerPage';

import CitySearchBarContent from './components/CitySearchBarContent';
import GymSearchBarContent from './components/GymSearchBarContent';

const middleware = applyMiddleware( thunk, createLogger() );
const store = createStore( reducer, middleware );

const App = () => (
  <div>
    <Home />
  </div>
)

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      {/* add the routes here */}
      <Route path="/FindYourSpot" component={CityChooser}/>
      {/* {Prop} :id
        * WHERE DOES IT COME FROM: <CitySquare />'s handleClick method
            * takes the city that was clicked, finds it's 'id' and 'name' properties and pushes it to the end of the "/FindYourGym/" url
        * THEN WHAT? <GymChooser /> is passed ":id" and ":name" from Route and renders SearchBar passing in both
        * THEN WHAT? <SearchBar /> is passed :id and ":name"  and passes it on to it's children props: <GymSquares />
        */}
      <Route path="/FindYourGym/:name/:id/categories" component={GymCatChooser}></Route>
      <Route path="/FindYourGym/:name/:id/categories/:catName/:catId" component={GymChooser}></Route>
      {/*<Route path="/FindYourGym/paris/0/categories/boxing/0" component={GymChooser}></Route>*/}
    </Router>
  </ Provider>
), document.getElementById('root'))
