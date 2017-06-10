import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cityActions from '../actions/cityActions'

import {Link} from 'react-router';

import FlexColumnContainer from './FlexColumnContainer';
import Logo from './Logo';
import HamburgerMenu from './HamburgerMenu';
import SearchBar from './SearchBar';
import CitySquares from './CitySquares';

//data
//import { Gyms } from '../data/gyms/gym'
class CityChooser extends Component {

  componentDidMount() {
    setTimeout( () => {this.props.fetchCity()}, 3000)
  }

  render () {
    const {cities} = this.props;
    console.info(cities)

    const citySquares = cities.length
    ? <SearchBar
        dataToFilter={cities}
        placeholder='find your new gym'
        className={css(styles.searchBar)}
      >
        <CitySquares/>
      </SearchBar>
    : <h1>LOADING...</h1>;

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
        {/* below can be refactored as a component passed as children in index.js under routes
          * For example: <Route path="/CityChooser" component={CityChooser}>
                            <IndexRoute component={CitySearchBarContent}/>
                            <Route path="/GymChooser" component={GymSearchBarContent}/>
                        </Route>
          * then pass {this.props.children} in place of below
          */}
        <div className={css(styles.mtAuto, styles.fullWidth)}>
          <div className={css(styles.fullWidth)}>
            {citySquares}
          </div>
        </div>

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
var styles = StyleSheet.create({

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
