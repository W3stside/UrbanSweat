import React, { Component } from 'react'
import ReactDOM from 'react-dom'
//import { createStore } from 'redux'
import Examples from './components/Examples'
import UrbanSweatLogo from './components/UrbanSweatLogo'
//import store from './redux/store/config'
//import style from './css/bootstrap.css'

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <UrbanSweatLogo />
            <Examples />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
