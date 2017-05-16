import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/Actions'
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  p: {
    color: 'ghostwhite',
    font: 'Helvetica',
    fontStyle: 'italic',
    fontWeight: '400'
  },
  padding_0: {
    padding: '0',
    transition: 'all 2s linear',
    width: '100%'
  },
  strikethroughHover: {
    ':hover': {
      textDecoration: 'line-through',
      textShadow: '0 0 2px #10FF8C'
    }
  },
  opacity_0: {
    opacity: '0'
  },
  hideList: {
    display: 'flex', flex: 1,
    height: '0',
    overflow: 'hidden',
  },
  showList: {
    display: 'flex', flex: 1,
    height: '100%', minWidth: '33.33%'
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
  },
  smallCityChooserHeader: {
    color: 'ghostwhite',
    font: 'italic bold 250% "Helvetica"',
    margin: '15px 0 0 0',
    position: 'static',
    zIndex: '5'
  },
  movingOptionsHeader: {
    fontSize: '125%',
    lineHeight: '0.5',
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

export class SearchBar extends React.Component {

  render () {
    var Gyms = this.props.cities;
    let filteredCities = Gyms[0].cities.filter(
      (city) => {
        return city["name"].toLowerCase().indexOf(this.props.dataInput.toLowerCase()) !== -1;
      }
    );
    var hideShowList = css(this.props.dataInput ? styles.showList : styles.hideList);

    return (
      <div style={{width:'100%'}}>

        <form>
           <input
             className={this.props.className}
             type='text'
             value={this.props.dataInput}
             onChange={ (input) => {
               this.props.handleDataInput(input)
             }}
             placeholder={this.props.placeholder}
             />
        </form>

        <div style={{marginTop: 40, display: 'flex', flexFlow:'row wrap', justifyContent:'center', alignItems:'center', width:'100%'}}>
          {filteredCities.map(
            (city, index) =>
              <div className={hideShowList}>
                <div style={{width: '100%'}}
                  key={index}>
                    {city.name && city.component ? city.component : city.name}
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    dataInput: state.dataInput
  }
}

function mapActionCreatorsToProps (dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(SearchBar)
