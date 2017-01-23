import React, { Component } from 'react'

export default class BackgroundPic extends React.Component {

  render () {
    const style = {
      minWidth: '100%',
      position: 'absolute',
      left: 0, right: 0,
      top: 0, bottom: 0,
      transform: 'translate(0%,-30%)',
      zIndex: '-99999'
    }
    return <img src={this.props.image} style={style}/>;
  }
}
