import React from 'react'

var styles = {
  display: 'flex',
  flexFlow: 'column nowrap',
  height: '100vh'
}

const FlexColumnContainer = (props) => (
  <div style={styles}>
    {props.children}
  </div>
)

export default FlexColumnContainer;
