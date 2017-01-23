import React, { Component } from 'react'

export default class Links extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
  }

  onMouseEnterHandler () {
    this.setState({
      hover: true
    });
  }

  onMouseLeaveHandler () {
    this.setState({
      hover: false
    });
  }

  render () {
    var hoverColor = disactiveHover;
    if (this.state.hover) {
      hoverColor = activeHover;
    }
    return (
        <span>
          <a href={this.props.url} onMouseOver={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler} style={hoverColor}>{this.props.name}</a>
        </span>
    );
  }
};

var disactiveHover = {
    color: 'black',
    fontWeight: 700,
    fontSize: '112%',
    fontStyle: 'italic',
    textDecoration: 'none',

    transition: 'all 0.8s ease-in-out'
  }

var activeHover = {
    color: '#10FF8C',
    fontWeight: 700,
    fontSize: '112%',
    fontStyle: 'italic',
    textDecoration: 'none',
    textShadow: '1px 0 20px black'
}
