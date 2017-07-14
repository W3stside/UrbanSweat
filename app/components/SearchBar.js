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

  /*componentWillReceiveProps(nextProps) {
    nextProps !== currentProps ? SOMETHING : SOMETHING_ELSE;
  }*/

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
    const styles = StyleSheet.create({
      defaultStyle: {
        ':focus': {
          boxShadow: this.props.shadowFX ? '0px 0px 45px -7px #10FF8C' : 'none',
        },
        border: '6px solid ghostwhite',
        boxShadow: this.props.shadowFX ? '0px 0px 45px -7px black' : 'none',
        font: '175% Helvetica',
        height: '100%', width: '100%',
        margin: '0',
        padding: 10,
        outline: 'none',
        textAlign: 'center',
        textTransform: 'lowercase'
      },
    })

    return (
      <div className="fullWidthHeight">

        <form className="fullWidthHeight">
           <input
           className={css(styles.defaultStyle, this.props.customAphrodite)}
           type='text'
           value={this.props.dataInput}
           onChange={ (input) => {
             this.props.handleDataInput(input.target.value)
           }}
           placeholder={this.props.placeholder}/>
        </form>

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
