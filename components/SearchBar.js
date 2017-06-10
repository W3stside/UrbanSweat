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

  static propTypes = {
    cityIndex: React.PropTypes.number,
    className: React.PropTypes.string,

    click: React.PropTypes.bool,
    dataInput: React.PropTypes.string,

    Data: React.PropTypes.array,
    handleClick: React.PropTypes.func,

    handleDataInput: React.PropTypes.func,
    value: React.PropTypes.string
  }

  render () {
    //var Data = this.props.dataToFilter;
    var childrenWithProps = React.Children.map( this.props.children ,
      ( child ) => React.cloneElement( child , {
        ...this.props
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
    dataInput: state.dataInput.dataInput
  }
}

function mapActionCreatorsToProps (dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(SearchBar)
