import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cityActions from '../actions/cityActions'

import {Link} from 'react-router'

import CitySearchBarContent from './CitySearchBarContent'
import FlexColumnContainer from './FlexColumnContainer'
import HamburgerMenu from './HamburgerMenu'
import Logo from './Logo'

//data
//import { Gyms } from '../data/gyms/gym'
class CityChooser extends Component {

  componentDidMount() {
    //load in cities from DB
    this.props.fetchCity()
  }

  render () {
    const {cities} = this.props;
    const citySquares = cities.length
      //if cities array has any cities in it:
      ? <CitySearchBarContent dbData={cities}/>
      //show loading bar or spinner or whatever
      : <div className={css(!cities.length ? styles.mtAutoFull : styles.mtAuto, styles.fullWidth)}>
          <div className={css(styles.fullWidth)}>
            <h1>LOADING...</h1>
          </div>
        </div>;

    return (
      <FlexColumnContainer>

        <div className={css(styles.fullWidth)}>
          <div className={css(styles.fullWidth)}>
            {/*Top half content: Logo and Hamburger Menus*/}
            <div className={css(styles.padding_0)}>
               <HamburgerMenu />
               <Logo
                className={css(styles.threeQuarters)}
               />
            </div>
          </div>
        </div>

        {citySquares}

      </FlexColumnContainer>
    );
  }
}

/*<SearchBar
  dataToFilter={cities && cities.length ? cities : null}
  placeholder='find your new gym'
  className={css(styles.searchBar)}
 >
    <CitySquares/>
</SearchBar>*/

////////////////////////////////
//State and Action Mapping
///////////////////////////////

function mapStateToProps (state) {
  return {
    cities: state.cities.cities,
  }
}

function mapActionCreatorsToProps (dispatch) {
  return bindActionCreators(cityActions, dispatch);
}

////////////////////////////////////////
// Styling - Aphrodite
///////////////////////////////////////
const styles = StyleSheet.create({

  padding_0: {
    padding: '0',
    transition: 'all 2s linear',
    width: '100%'
  },
  searchBar: {
    ':focus': {
      boxShadow: '0px 0px 45px -7px #10FF8C'
    },
    border: '2px solid ghostwhite',
    borderRadius: 18,
    boxShadow: '0px 0px 45px -7px black',
    font: '175% Helvetica',
    margin: '15px 0 11px 0',
    padding: 3,
    outline: 'none !important',
    textAlign: 'center',
    textTransform: 'lowercase'
  },
  fullWidth: {
    textAlign: 'center',
    width: '100%'
  },
  mtAutoFull: {
    marginTop: 'auto',
    minHeight: 400,
  },
  mtAuto: {
    marginTop: 'auto'
  },
  cityChooserHeader: {
    fontSize: '120%',
    position: 'static',
    zIndex: '1',
    color: 'black',
    margin: '0 0 40px 0'
  },
  threeQuarters: {
    height: '45vh',
    overflow: 'hidden',
    '@media (max-width: 850px)': {
      marginTop: 60
    },
    transition: 'all 0.5s linear'
  }
});

export default connect( mapStateToProps, mapActionCreatorsToProps )(CityChooser);
