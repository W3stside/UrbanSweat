import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/Actions'
import { StyleSheet, css } from 'aphrodite';

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
    //var windowSize = css(window.innerWidth > 850 ? styles.thirtyThree : styles.fifty);
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
                    {city.name && city.component ? city.component() : city.name}
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
