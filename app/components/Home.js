
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Links from './Links'
import BackgroundPic from './BackgroundPic'
import Logo from './Logo'

const Home = () => (
 <div style={{width: '100%'}}>
  <BackgroundPic styleBG={bgImgStyle} image={bgPic} />
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

var bgImgStyle = {minWidth: '100%', height: 'auto', position: 'absolute', bottom: 0};
var bgPic = require("../img/grey-berlin-arch.jpg");
var logo = require("../img/logo2.png");

var styles = StyleSheet.create({
  linkStyle: {
      ':hover': {
        color: 'rgba(94,255,178, 1)',
        textShadow: '1px 0 20px black'
      },
      color: 'black',
      font: '400 italic 200% Helvetica',
      textDecoration: 'none',

      transition: 'all 0.24s ease-in-out'
    }
});

export default Home;
