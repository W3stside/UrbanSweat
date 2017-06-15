import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/Actions'

const ClickContainer = ( {children, click, handleClick} ) => {

  var childrenWithProps = React.Children.map(children,
    (child) =>
    React.cloneElement( child , {
      handleClick,
      click
    })
  );

  return (
    <div>
      {childrenWithProps}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    click: state.click
  }
}

function mapActionCreatorsToProps (dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps,mapActionCreatorsToProps)(ClickContainer);
