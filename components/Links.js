import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Links extends React.Component {

  render () {

    return (
        <span>
          <Link to={this.props.url} className={this.props.className}>{this.props.name}</Link>
        </span>
    );
  }
};
