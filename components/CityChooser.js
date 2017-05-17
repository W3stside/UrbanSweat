import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';

import Logo from './Logo'
import BackgroundPic from './BackgroundPic'
import HamburgerMenu from './HamburgerMenu'
import SearchBar from './SearchBar'
import Header from './Header'
import CitySquares from './CitySquares'

//data
import { Gyms } from '../data/gyms/gym'

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

////////////////////////////////////////
// End of Styling - Aphrodite
///////////////////////////////////////

export default class CityChooser extends Component {
  render () {
    return (
      <div style={{display: 'flex', flexFlow: 'column wrap'}}>
        <div>
          <div className={css(styles.fullWidth)}>

            <div className={css(styles.padding_0)}>
               <HamburgerMenu />
               <Logo
                className={css(styles.threeQuarters)}
               />
            </div>

          </div>
        </div>

        <div className="citychooser">
          <div className={css(styles.fullWidth)}>

            <SearchBar
              dataToFilter={Gyms}
              placeholder='Find your spot'
              className={css(styles.searchBar)}
             >
              <CitySquares linkTo={"/"}/>
            </SearchBar>

          </div>
        </div>
      </div>
    );
  }
}
