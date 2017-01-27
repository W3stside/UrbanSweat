import React, {Component} from 'react'
import Logo from './Logo'

export default class CityChooser extends React.Component {

  render () {
    var logo = require("../img/logo2.png");

    return (
      <div>
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-xs-12">
               <Logo logo={logo}/>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-sm-4">
              Temp Content
            </div>
            <div className="col-sm-4">
              Temp Content
            </div>
            <div className="col-sm-4">
              Temp Content
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              Temp Content
            </div>
            <div className="col-sm-4">
              Temp Content
            </div>
            <div className="col-sm-4">
              Temp Content
            </div>
          </div>
        </div>

      </div>
    );
  }
}
