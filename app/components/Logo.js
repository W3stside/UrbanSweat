import React, { Component } from 'react'

export default class Logo extends React.Component {

  render () {
    return (
      <div
      className={`flex aCenter jCenter fullWidthHeight ${this.props.customClassName ? this.props.customClassName : ""}`}
      >
        <img src={this.props.logo} style={this.props.styleLogo}/>
      </div>
    );
  }
}

Logo.defaultProps = {
  logo: require("../assets/logo2.png"),
  styleLogo: {
    maxHeight: '100%', maxWidth: '100%', height: 'auto'
  }
}
