import React, {Component,PropTypes} from 'react';
import {StyleSheet,css} from 'aphrodite';

//Components
import BigHeader from './BigHeader'
import FlexColumnContainer from './Containers/FlexColumnContainer'
import GymNameSquares from './GymNameSquares'
import HamburgerMenu from './HamburgerMenu'
import Logo from './Logo'
import SearchBar from './SearchBar'

//data
import { Gyms } from '../data/gyms/gym'

export default class GymChooser extends Component {

  render () {

    return (
      <FlexColumnContainer>

        <div style={{height: '40%', width: '100%'}}>
          <div style={{height: '100%', width: '100%'}}>
             <HamburgerMenu />
             <BigHeader text={this.props.params.name + ' >> ' + this.props.params.catName}/>
          </div>
        </div>
{/*Lower Half*/}
        <div className={css(styles.mtAuto, styles.fullWidth)}>
          <div className={css(styles.fullWidth)}>
            <SearchBar
              dataToFilter={Gyms}
              cityIndex={this.props.params.id}
              gymIndex={this.props.params.catId}
              placeholder='find your new gym'
              className={css(styles.searchBar)}
             >
                <GymNameSquares/>
            </SearchBar>
          </div>
        </div>

      </FlexColumnContainer>
    );
  }
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
