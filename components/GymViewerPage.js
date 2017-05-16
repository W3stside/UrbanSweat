import React, {Component} from 'react'
import Links from './Links'
import BackgroundPic from './BackgroundPic'
import Logo from './Logo'
import HamburgerMenu from './HamburgerMenu'
import { StyleSheet, css } from 'aphrodite';
import { Gyms } from '../data/gyms/gym.js';

import Slideshow from './Slideshow'

const styles = StyleSheet.create({
  border: {
    border: '0px solid black'
  },

  movingHalf: {
    transform: 'translateY(0%)'
  },

  flexContainer: {
    display: '-webkit-flex', display: '-moz-flex', display: '-o-flex', display: 'flex',
    margin: '0 auto',
    position: 'relative'
  },

  inlineFlexContainer: {
    display: '-webkit-inline-flex', display: '-moz-inline-flex', display: '-o-inline-flex', display: 'inline-flex',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden'
  },

  rowWrap: {
    flexFlow: 'row wrap'
  },

  colWrap: {
    flexFlow: 'column wrap'
  },

  alignChildrenCenter: {
    alignItems: 'center'
  },

  alignChildrenTop: {
    alignItems: 'flex-start'
  },

  justifyCenter: {
    justifyContent: 'center'
  },

  flex1: {
    flex: '1'
  },

  fullWidthHeight: {
    height: '100%',
    width: 'auto'
  },

  flexItemFullWidth: {
    width: '100%'
  },
  minWidth: {
    minWidth: 500
  },
  defaultFont: {
    color: 'black',
    font: 'italic 150% "Helvetica"',
    textAlign: 'center'
  },
  blackBG: {
    backgroundColor: 'white',
    padding: '2%',
    textAlign: 'center'
  }
})

export default class GymViewerPage extends React.Component {
  render () {
    return (
      <div className={css(styles.flexContainer, styles.colWrap, styles.fullWidthHeight)}>

          {/*Top 100% section*/}
          <div className={css(styles.flexContainer, styles.flexItemFullWidth, styles.flex1, styles.justifyCenter, styles.alignChildrenTop)}>
                <HamburgerMenu />
                <Logo styleLogo={{maxWidth: '30vh'}}/>
          </div >

          {/*Bottom 100% section*/}

          <GymContent
            styleName={{display: 'flex', flex: 2}}
            gyms={Gyms[0].cities[0].categories[0].gyms}
            />

      </div> //end main div
    );
  }
}

const GymText = ({gymHeader,gymPOne,gymPTwo}) => (

    <div className={css(styles.flexContainer, styles.minWidth, styles.flex1, styles.alignChildrenCenter, styles.justifyCenter, styles.colWrap, styles.defaultFont)}>
      <div style={{padding: '6%'}}>
        <h2 style={{width: '100%', display: "inline-block", backgroundColor:"lightgrey"}}>{gymHeader}</h2>
        <br/>
        <div style={{fontSize: '80%', width: '100%'}}>{gymPOne}</div>
        <br/>
        <div style={{fontSize: '80%', width: '100%'}}>{gymPTwo}</div>
      </div>
    </div>
)

const GymPhotos = ({gymPhotos}) => (
  <div className={css(styles.flexContainer, styles.minWidth, styles.flex1)}>
    <Slideshow />
  </div>
)

function GymContent (props) {

  var gyms = props.gyms;
  const gymRenderer = gyms.map( (gym, index) =>
    <div key={index} className={css(styles.flexContainer, styles.rowWrap, styles.fullWidthHeight, styles.flex1, styles.movingHalf)}>
      <GymPhotos gymPhotos={gym.description.image_url}/>
      <GymText gymHeader={gym.description.text.header} gymPOne={gym.description.text.pOne} gymPTwo={gym.description.text.pTwo}/>
    </div>
  );
  return (
    <div style={props.styleName}>
        {gymRenderer}
    </div>
  );
}
