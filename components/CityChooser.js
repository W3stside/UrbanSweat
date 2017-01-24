import React, {Component} from 'react'
import Logo from './Logo'

export default class CityChooser extends React.Component {

  render () {
    var logo = require("../img/logo.png");

    return (
      <div>
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-xs-12">
               <Logo logo={logo}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
