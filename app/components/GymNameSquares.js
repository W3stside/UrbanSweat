import React from 'react'
import {Redirect, hashHistory} from 'react-router'
import { StyleSheet, css } from 'aphrodite';

import HoverStateContainer from './HoverStateContainer'
import Header from './Header'
import MovingOptions from './MovingOptions'
import BackgroundPic from './BackgroundPic'

const styles = StyleSheet.create({
  hideList: {
    display: 'flex', flex: 1,
    height: '0',
    overflow: 'hidden',
  },
  showList: {
    display: 'flex', flex: 1,
    height: '100%', minWidth: '33.33%',
    '@media (max-width: 850px)': {
      minWidth: '50%'
    },
    '@media (max-width: 550px)': {
      minWidth: '100%'
    },
  },

  //citysquares
  smallCityChooserHeader: {
    color: 'ghostwhite',
    font: 'italic bold 250% "Helvetica"',
    margin: '0 0 12px 0',
    position: 'static',
    zIndex: '5'
  },
  citySquareContainerStyle: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column nowrap',
    height: 'auto', width: '100%', minHeight: 300,
    position: 'relative',
    overflow: 'hidden',
    padding: '10% 0'
  },
  movingOptionsStyle: {
    listStyle: 'none',
    color: 'white',
    paddingLeft: '0',
    margin: '0',
    fontSize: '140%',
    fontStyle: 'italic',
    lineHeight: '1'
  }

});

export default function GymNameSquares (props) {

  let filteredData = props.Data[0].cities[props.cityIndex].categories[props.gymIndex].gyms.filter(
    (item) => {
      if (props.dataInput.toLowerCase() === "all") {
        return item["name"];
      }
      return item["name"].toLowerCase().indexOf(props.dataInput.toLowerCase()) !== -1;
    }
  );

  var gymList = css(props.dataInput ? styles.showList : styles.hideList);

  return (
    <div style={{marginTop: 40, display: 'flex', flexFlow:'row wrap', justifyContent:'center', alignItems:'center', width:'100%'}}>
      {filteredData.map(
      (item, index) => {
          return (
            <div className={hideShowList} key={index}>
              <div
              style={{width: '100%', cursor: 'pointer'}}
              onClick={ () => {
                props.handleClick(props.click);
              }}>
                <HoverStateContainer style={styles.citySquareContainerStyle}>
                 <BackgroundPic/>
                 <Header name={item.name.toUpperCase()} style={styles.smallCityChooserHeader}/>
                 {/*<MovingOptions index={index} categories={ '' } style={styles.movingOptionsStyle}/>*/}
               </HoverStateContainer>
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}
