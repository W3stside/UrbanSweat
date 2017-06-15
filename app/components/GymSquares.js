import React, {Component} from 'react'
import {browserHistory} from 'react-router'
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

export default class GymSquares extends Component {

  handleClick (name, id) {
    //window.alert('/FindYourGym/' + id + '?' + name)
    browserHistory.push(this.props.location.pathname + '/' + name.toLowerCase() + '/' + id);
  }

  render () {
    let filteredData = this.props.Data[0].cities[this.props.cityIndex].categories.filter(
      (item) => {
        if (this.props.dataInput.toLowerCase() === "all") {
          return item["name"];
        }
        return item["name"].toLowerCase().indexOf(this.props.dataInput.toLowerCase()) !== -1;
      }
    );

    var hideShowList = css(this.props.dataInput ? styles.showList : styles.hideList);

    return (
        <div style={{marginTop: 40, display: 'flex', flexFlow:'row wrap', justifyContent:'center', alignItems:'center', width:'100%'}}>
          {filteredData.map(
          (item, index) => {

            return (
              <div className={hideShowList} key={index}>
                <div
                style={{width: '100%', cursor: 'pointer'}}
                onClick={this.handleClick.bind(this, item.name, item.id)}>
                  <HoverStateContainer style={styles.citySquareContainerStyle}>
                   <BackgroundPic image={item.bgImg}/>
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
}
