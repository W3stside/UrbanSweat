import React from 'react'
import { Link } from 'react-router'

export default function LinksContainer (props) {
  var defaultStyle = {
    height: "100%", width: '100%'
  }
  return (
    <div style={defaultStyle}>
      <Link style={defaultStyle} to={props.linkTo}>
        {props.children}
      </Link>
    </div>
  )
}
