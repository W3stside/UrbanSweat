import React, { Component } from 'react'

export default class Logo extends React.Component {

  static propTypes () {
    logo: React.PropTypes.string
    styleLogo: React.PropTypes.string
  }

  render () {
    return (
      <div
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      className={this.props.className}
      >
        <img src={this.props.logo} style={this.props.styleLogo}/>
      </div>
    );
  }
}

Logo.defaultProps = {
  logo: require("../assets/logo2.png"),
  styleLogo: {
    maxWidth: '100%', height: 'auto'
  }
}
