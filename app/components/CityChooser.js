//REACT Imports
import React, {Component} from 'react';
import PropTypes from 'prop-types';
//APHRODITE
import { StyleSheet, css } from 'aphrodite';
//ROUTER Links
import {Link} from 'react-router';
//COMPONENTS
import CitySearchBarContent from './CitySearchBarContent';
import HamburgerMenu from './HamburgerMenu';
import Logo from './Logo';
import LoadingGif from './LoadingGif';
import UIUnmounter from './Containers/UIUnmounter';

const CityChooser = (props) => {

    const {cities, fetched, fetching} = props.cities;

    //show loading bar or spinner or whatever
    if (fetching) return <LoadingGif />

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

export default CityChooser;
