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
            <div className={css(styles.menuLi)}><Links name={'GYMS'} url={"/FindYourGym"} className={css(styles.linkStyle)}/></div>
            <div className={css(styles.menuLi)}><Links name={'PROFILE'} className={css(styles.linkStyle)}/></div>

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
    backgroundColor: /*'#505050'*/ 'rgba(255,255,255,0.2)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    opacity: 1,
    overflow: 'hidden',
    position: 'absolute', left: 100, top: 20, height: 'auto',
    '@media (max-width: 850px)': {
      justifyContent: 'flex-start',
      height: 97
    }
  },
  openMenu: {
    width: '18%',
    '@media (max-width: 850px)': {
      width: '60%'
    },
    '@media (max-width: 550px)': {
      width: '66%'
    },
    transition: 'all 0.3s linear'
  },
  closedMenu: {
    width: 0,

    transition: 'all 0.3s linear'
  },
  menuLiCont: {
    display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', alignItems: 'center', textAlign: 'left',
    font: '400 italic 3vw Helvetica',
    '@media (max-width: 850px)': {
      flexFlow: 'row nowrap', justifyContent: 'space-around',
      font: '400 italic 4vw Helvetica',
      width: '100%'
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
        letterSpacing: 0,
        textShadow: '1px 0 20px black'
      },
      color: '#505050',
      letterSpacing: -3,
      textDecoration: 'none',

      transition: 'all 0.24s linear  '
    }
})

export default connect(mapStateToProps, mapActionCreatorsToProps)(HamburgerMenu);
