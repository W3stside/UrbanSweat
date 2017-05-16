import React, { Component } from 'react'

export default class BackgroundPic extends React.Component {

  static propTypes () {
    image: React.PropTypes.string.isrequired
  }

  render () {

    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', left: 0, overflow: 'hidden', zIndex: '-99999'}}>
        <img src={this.props.image} style={this.props.styleBG}/>
      </div>
    );
  }
}

var styleBG = {
  minWidth: '100%',
  height: 'auto',
  //left: 0, right: 0, top: 0, bottom: 0,
  filter: 'brightness(70%)'
  //transform: 'translate(0%,-50%)'
}

BackgroundPic.defaultProps = {
  image: require("../img/grey-berlin-arch.jpg"),
  styleBG: styleBG
}
