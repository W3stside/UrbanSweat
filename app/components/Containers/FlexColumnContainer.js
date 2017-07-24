import React from 'react'

var styles = {
  height: '100vh'
}

const FlexColumnContainer = (props) => (
  <div className="flex colNoWrap" style={styles}>
    {props.children}
  </div>
)

export default FlexColumnContainer;
