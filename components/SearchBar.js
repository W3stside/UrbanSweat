import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/Actions'
import { StyleSheet, css } from 'aphrodite';

/** SMART CONTAINER
* {Props} =
* Data array
* Placeholder text in search bar
* Styling via Aphrodite

* {State} =
* Handled by redux
* dataInput - i.e whatever is typed into the search bar is STATE

* {childrenWithProps} =
* CitySquares is the rendered componnent that takes in the STATE and FILTERS through the DATA ARRAY to present squares
*/

export class SearchBar extends Component {

  render () {
    var Data = this.props.dataToFilter;
    //MOVED OUT: var hideShowList = css(this.props.dataInput ? styles.showList : styles.hideList);
    var childrenWithProps = React.Children.map( this.props.children ,
      ( child ) => React.cloneElement( child , {
        dataInput: this.props.dataInput,
        Data
      })
    );

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

        <div style={{width: '100%'}}>
          {childrenWithProps}
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
