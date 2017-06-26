import React from 'react'
import {StyleSheet,css} from 'aphrodite'

import CitySquares from './CitySquares'
import SearchBar from './SearchBar'

const CitySearchBarContent = (props) => (
  <div className={css(styles.fullWidth)} style={{display: 'flex', height: '100%'}}>
    <div className={css(styles.fullWidth)} style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{margin: '0 auto 37px auto', width: '85%'}}>
        <SearchBar
        shadowFX={true}
        placeholder='Find your spot'/>
      </div>
      <div style={{width: '100%' }}>
        <CitySquares
        dataToFilter={props.dbData}
        renderMovingOptions={true}
        verticalFade={false}/>
      </div>

    </div>
  </div>
);
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
      border: '6px solid ghostwhite',
      borderRadius: 18,
      boxShadow: '0px 0px 45px -7px black',
      font: '175% Helvetica',
      margin: '0',
      padding: 10,
      outline: 'none',
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

export default CitySearchBarContent;
