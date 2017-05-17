import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import "babel-polyfill";
//Redux imports
import { createStore } from 'redux'
import reducer from './reducers/reducer'
import { Provider } from 'react-redux'
//Components
import Home from './components/Home'
import CityChooser from './components/CityChooser'
import GymViewerPage from './components/GymViewerPage'

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}/>
      {/* add the routes here */}
      <Route path="/FindYourSpot" component={CityChooser}/>
      <Route path="/GymViewerPage" component={GymViewerPage}/>
    </Router>
  </ Provider>
), document.getElementById('root'))
