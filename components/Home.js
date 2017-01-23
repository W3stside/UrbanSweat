
import React, { Component } from 'react'
import Links from './Links'
import BackgroundPic from './BackgroundPic'
import Logo from './Logo'

export default class Home extends React.Component {

  render () {
    var logo = 'https://lh6.googleusercontent.com/tOWw2ItInzzOOVDZfXyvQ-1R-uZujXYtxzcVfzldVzWxQKuwycgP0dp61iT5APipPZO1grouIbwPdKQ=w3201-h1584-rw';
    return (
     <div>
      <BackgroundPic image={require("url-loader?mimetype=image/png!../img/grey-berlin-arch.jpg")}/>
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-xs-12">
               <Logo logo={require("url-loader?mimetype=image/png!../img/logo.png")}/>
             </div>
          </div>
          <div className="row text-center">
             <div className="col-sm-4">
              <Links name="ENTER" url="#"/>
             </div>
             <div className="col-sm-4">
              <Links name="ABOUT" url="#"/>
             </div>
             <div className="col-sm-4">
              <Links name="CONTACT" url="#"/>
             </div>
           </div>
        </div>
      </div>
    );
  }
}
