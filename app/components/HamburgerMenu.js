import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/Actions'

import Links from './Links'

import { StyleSheet, css } from 'aphrodite';

export class HamburgerMenu extends Component {

  /** Hamburger Menu state is hover: true or hover: false based on MouseEnter or MouseLeave
  * Props - ACTION: handleMouseOver() fn to set hover state to TRUE
  * Props - ACTION: handleMouseLeave() fn to set hover state to FALSE
  * ^^^ consider editing to make hover: !hover instead of true false in 2 turns
  * Styling - CONDITIONAL styling on button hover based off state; IF HOVERED === TRUE then enlarge else make small
  */

  render () {
    return (
      <div>
        <div
          onClick={ () => {this.props.handleMenuClick(this.props.onClick)}}
          className={css(styles.hmProto, this.props.onClick ? styles.isClicked : styles.hmCont)}>
            <div className={css(styles.hmLines)}></div>
            <div className={css(styles.hmLines)}></div>
            <div className={css(styles.hmLines)}></div>
        </div>

        <div className={css(styles.sideMenu, this.props.onClick ? styles.openMenu : styles.closedMenu)}>
          <div className={css(styles.menuLiCont)}>
            <div className={css(styles.menuLi)}><Links name={'HOME'} url={"/"} className={css(styles.linkStyle)}/></div>
            <div className={css(styles.menuLi)}><Links name={'CITIES'} url={"/FindYourSpot"} className={css(styles.linkStyle)}/></div>
            <div className={css(styles.menuLi)}><Links name={'PROFILE'} url={"/Profile"} className={css(styles.linkStyle)}/></div>

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    onClick: state.hamburgerMenu.menuClick
  }
}

function mapActionCreatorsToProps (dispatch) {
  return bindActionCreators(Actions, dispatch);
}

var styles = StyleSheet.create({
  hmProto: {
    ':hover': {
      backgroundColor: 'rgba(94,255,178, 1)',
      transition: 'all 0.3s linear',
    },
    border: "4px solid black",
    cursor: 'pointer',
    display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center",
    position: "absolute",
    left: 23, top: 23, width: 50, height: 50
  },

  hmCont: {
    transition: 'all 0.3s linear'
  },
  hmLines: {
    backgroundColor: 'black',
    display: "inline-flex",
    font: "bold 100% Helvetica",
    height: 5, width: '80%'
  },
  isClicked: {
    backgroundColor: 'rgba(94,255,178, 1)',
    transition: 'all 0.3s linear'
  },
  sideMenu: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    //Gradient
    background: 'rgb(98,252,198)', //Old browsers
    background: '-moz-linear-gradient(top, rgba(98,252,198,1) 0%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%)', // FF3.6-15
    background: '-webkit-linear-gradient(top, rgba(98,252,198,1) 0%,rgba(255,255,255,1) 100%,rgba(255,255,255,1) 100%,rgba(255,255,255,1) 100%)', // Chrome10-25,Safari5.1-6
    background: 'linear-gradient(to bottom, rgba(98,252,198,1) 0%,rgba(255,255,255,1) 100%,rgba(255,255,255,1) 100%,rgba(255,255,255,1) 100%)', // W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+
    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#62fcc6', endColorstr='#ffffff',GradientType=0 )", // IE6-9

    //borderRadius: 500,
    height: '100%', left: 100, top: 0,
    opacity: 0.96,
    position: 'fixed',
    /*
    backgroundColor: 'rgba(255,255,255,0.2)',
    left: 100, top: 20, height: 'auto',

    '@media (max-width: 850px)': {
      justifyContent: 'flex-start',
      height: 97
     },
    */
    overflow: 'hidden',
    //position: 'absolute',
    zIndex: 9999,
  },
  openMenu: {
    opacity: 0.96,
    width: '90%',
    /*'@media (max-width: 850px)': {
      width: '60%'
    },
    '@media (max-width: 550px)': {
      width: '66%'
  },*/
    transition: 'all 0.3s linear'
  },
  closedMenu: {
    opacity: 0,
    width: 0,

    transition: 'all 0.3s linear'
  },
  menuLiCont: {
    display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-around', alignItems: 'flex-start', textAlign: 'left',
    font: '400 italic 80px Helvetica',
    marginLeft: -10,
    '@media (max-width: 850px)': {
      font: '400 italic 10vw Helvetica',
    }
  },
  menuLi: {
    cursor: 'pointer',
    marginLeft: '5%',
    width: '100%',
    '@media (max-width: 850px)': {
      marginLeft: 0,
      width: 'auto'
    }
  },
  linkStyle: {
      ':hover': {
        color: 'rgba(0,0,0,1)',
        //letterSpacing: 4,
        textShadow: '5px 5px 10px rgba(0,0,0,0.5)'
      },
      color: '#505050',
      letterSpacing: -7,
      textDecoration: 'none',

      transition: 'all 0.24s linear  '
    }
})

export default connect(mapStateToProps, mapActionCreatorsToProps)(HamburgerMenu);
