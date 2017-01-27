
import React, { Component } from 'react'
import Links from './Links'
import BackgroundPic from './BackgroundPic'
import Logo from './Logo'

export default class Home extends React.Component {

  render () {
    var bgPic = require("../img/grey-berlin-arch.jpg");
    var logo = require("../img/logo2.png");
    return (
     <div style={{width: '100%'}}>
      <BackgroundPic image={bgPic} />
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-xs-12">
               <Logo logo={logo}/>
             </div>
          </div>
          <div className="row text-center">
             <div className="col-sm-4">
              <Links name="ENTER" url="/CityChooser" />
             </div>
             <div className="col-sm-4">
              <Links name="ABOUT" url="/About"/>
             </div>
             <div className="col-sm-4">
              <Links name="CONTACT" url="/Contact"/>
             </div>
           </div>
        </div>
      </div>
    );
  }
}
