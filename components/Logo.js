import React, { Component } from 'react'

export default class Logo extends React.Component {

  render () {
    return <img src={this.props.logo} style={{width: 400}}/>;
  }
}
