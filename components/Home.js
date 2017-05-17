
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
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
              <Links name="ENTER" url="/FindYourSpot" className={css(styles.linkStyle)}/>
             </div>
             <div className="col-sm-4">
              <Links name="ABOUT" url="/About" className={css(styles.linkStyle)}/>
             </div>
             <div className="col-sm-4">
              <Links name="CONTACT" url="/Contact" className={css(styles.linkStyle)}/>
             </div>
           </div>
        </div>
      </div>
    );
  }
}

var styles = StyleSheet.create({
  linkStyle: {
      ':hover': {
        color: 'rgba(94,255,178, 1)',
        textShadow: '1px 0 20px black'
      },
      color: 'black',
      fontWeight: 700,
      fontSize: '112%',
      fontStyle: 'italic',
      textDecoration: 'none',

      transition: 'all 0.24s ease-in-out'
    }
});
