import React, { Component } from 'react'

export default class Logo extends React.Component {

  static propTypes () {
    logo: React.PropTypes.string
  }

  render () {
    return <img src={this.props.logo} style={{maxWidth: '60vh'}}/>;
  }
}

Logo.defaultProps = {
  logo: require("../img/logo2.png")
}
