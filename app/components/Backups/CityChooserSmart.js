import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import actions and create 1 actions object
import * as cityActions from '../actions/cityActions';
import * as AllActions from '../actions/Actions';
import * as hamburgerMenuActions from '../actions/hamburgerMenuActions';
const Actions = {
  fetchCity: cityActions.fetchCity,
  handleDataInput: AllActions.handleDataInput,
  handleMenuClick: hamburgerMenuActions.handleMenuClick,
}
//ROUTER Links
import {Link} from 'react-router';
//COMPONENTS
import CitySearchBarContent from './CitySearchBarContent';
//import FlexColumnContainer from './Containers/FlexColumnContainer';
import HamburgerMenu from './HamburgerMenu';
import Logo from './Logo';
import LoadingGif from './LoadingGif';
import UIUnmounter from './Containers/UIUnmounter';

class CityChooser extends Component {

  componentDidMount() {
    //ACTION load in cities from DB
    this.props.fetchCity()
  }

  componentWillUnmount () {
    //ACTION reset dataInput in form search bar to nothing
    this.props.handleDataInput('');
  }
  render () {
    const {cities, fetched, fetchingCities} = this.props;

    //show loading bar or spinner or whatever
    if (fetchingCities) return <LoadingGif />

    return (
      <div className="flex colNoWrap fullWindowWidthHeight">

        <div className="textCenter width100">
          <div className="textCenter width100">
            {/*Top half content: Logo and Hamburger Menus*/}
            <div className={`flex aCenter jCenter padding0 width100 ${css(styles.transition2s)}`}>
                <UIUnmounter>
                    <HamburgerMenu />
                </UIUnmounter>
                <div className="flex aCenter jCenter" style={{maxWidth: 450}}>
                    <Logo className={css(styles.threeQuarters)}/>
                </div>
            </div>
          </div>
        </div>

        {/*Make sure NOT render CitySearchBar if aSync is nay finito or... an array for that matter.*/}
        {cities.length > 1 ? <CitySearchBarContent dbData={cities}/> : null}

      </div>
    );
  }
}

////////////////////////////////
//State and Action Mapping
///////////////////////////////

function mapStateToProps (state) {
  return {
    cities: state.cities.cities,
    fetchingCities: state.cities.fetching,
  }
}

function mapActionCreatorsToProps (dispatch) {
  return bindActionCreators(Actions, dispatch);
}

const styles = StyleSheet.create({

  transition2s: {
    transition: 'all 2s linear',
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
      //marginTop: 60
    },
    transition: 'all 0.5s linear'
  }
});

export default connect( mapStateToProps, mapActionCreatorsToProps )(CityChooser);
