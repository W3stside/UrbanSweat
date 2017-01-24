import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import Home from './components/Home'
import CityChooser from './components/CityChooser'

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
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    {/* add the routes here */}
    <Route path="/CityChooser" component={CityChooser}/>
  </Router>
), document.getElementById('root'))
