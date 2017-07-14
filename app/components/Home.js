
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Links from './Links'
import BackgroundPic from './BackgroundPic'
import Logo from './Logo'

const Home = () => (
 <div style={{width: '100%'}}>
  <BackgroundPic styleBG={bgImgStyle} image={bgPic} />
    <div className="container-fluid">
      <div className="flex rowWrap textCenter">
          <div className="flex xsP6 smP4 aCenter jCenter">
            <Logo logo={logo}/>
          </div>
          <div className="flex xsP6 smP4 aCenter jCenter">
           <Links name="ENTER" url="/FindYourSpot" className="italic font400 fontP200 padding10"/>
           <Links name="ABOUT" url="/About" className="italic font400 fontP200 padding10"/>
           <Links name="CONTACT" url="/Contact" className="italic font400 fontP200 padding10"/>
          </div>
      </div>
      <div className="row text-center">

       </div>
    </div>
  </div>
);

var bgImgStyle = {minWidth: '100%', height: 'auto', position: 'absolute', bottom: 0};
var bgPic = require("../img/grey-berlin-arch.jpg");
var logo = require("../img/logo2.png");

export default Home;
