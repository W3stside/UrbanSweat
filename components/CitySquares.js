import React, {Component, PropTypes} from 'react'
import {browserHistory, Link} from 'react-router'
import { StyleSheet, css } from 'aphrodite';

import HoverStateContainer from './HoverStateContainer'
import Header from './Header'
import MovingOptions from './MovingOptions'
import BackgroundPic from './BackgroundPic'

const styles = StyleSheet.create({
  hideList: {
    display: 'flex', flex: 1,
    height: '0',
    overflow: 'hidden'
  },
  showList: {
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.4)'
    },
    display: 'flex', flex: 1,
    height: '100%', minWidth: '33.33%',
    '@media (max-width: 850px)': {
      minWidth: '50%'
    },
    '@media (max-width: 550px)': {
      minWidth: '100%'
    },
    transition: 'background-color 0.47s linear'
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
    height: 'auto', width: '100%',
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

export default class CitySquares extends Component {

  handleClick (name, id) {
    //window.alert('/FindYourGym/' + id + '?' + name)
    browserHistory.push('/FindYourGym/' + name.toLowerCase() + '/' + id + '/categories');
  }
  //Data passed in via dataToFilter prop MUST be pointing at the correct slices of data before getting HERE
  render () {
    console.log("CitySquares props = ", this.props.dataToFilter);
    let filteredData = this.props.dataToFilter.filter(
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
          (item, index) =>
              <div className={hideShowList} key={index}>
                <div
                style={{width: '100%', cursor: 'pointer'}}
                onClick={this.handleClick.bind(this, item.name, item.id)}>
                  {/*this.props.handleClick(this.props.click);*/}

                    <HoverStateContainer style={styles.citySquareContainerStyle}>
                     <BackgroundPic image={item.bgImageURL}/>
                     <Header name={item.name.toUpperCase()} style={styles.smallCityChooserHeader}/>
                     <MovingOptions index={index} categories={ item.categories } style={styles.movingOptionsStyle}/>
                   </HoverStateContainer>

                </div>
              </div>
          )}
        </div>
    )
  }
}

CitySquares.propTypes = {
  Data: PropTypes.array || PropTypes.object,
  dataInput: PropTypes.string
}

//{ !this.props.click && city.name && city.component ? city.component() : hashHistory.push(city.url) }
