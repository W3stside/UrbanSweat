import React, { Component } from 'react'
import { Link } from 'react-router'

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
          <Link to={this.props.url} onMouseOver={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler} style={hoverColor}>{this.props.name}</Link>
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

    transition: 'color 0.8s ease-in-out'
  }

var activeHover = {
    color: '#10FF8C',
    fontWeight: 700,
    fontSize: '112%',
    fontStyle: 'italic',
    textDecoration: 'none',
    textShadow: '1px 0 20px black'
}
