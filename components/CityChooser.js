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
    font: 'italic 100% Helvetica',
    border: '5px solid ghostwhite',
    borderRadius: 18,
    padding: 5,
    boxShadow: '0px 0px 45px -7px black',
    outline: 'none !important'
  },
  fullWidth: {
    textAlign: 'center',
    width: '100%'
  },
  logoStyle: {
    margin : '8%',
    width : '30vh'
  },
  cityChooserHeader: {
    fontSize: '120%',
    position: 'static',
    zIndex: '1',
    color: 'black',
    margin: '0 0 40px 0'
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
               <Logo style={styles.logoStyle}/>
            </div>

          </div>
        </div>

        <div className="citychooser">
          <div className={css(styles.fullWidth)}>

            <div className={css(styles.padding_0)}>
              <Header name="Choose Your City" style={styles.cityChooserHeader}/>
            </div>

            <SearchBar
              dataToFilter={Gyms}
              placeholder='Find your spot'
              className={css(styles.searchBar)}
             >
              <CitySquares />
            </SearchBar>

          </div>
        </div>
      </div>
    );
  }
}
