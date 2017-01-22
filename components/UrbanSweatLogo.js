import React, {Component} from 'react'

export default class UrbanSweatLogo extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const logo_style = {
      fontSize: '70px',
      fontStyle: 'italic',
      fontWeight: '700',
      letterSpacing: '-7px',
      lineHeight: '15px'
    }
    const logo_p1 = {
      padding: '21px 16px 10px 0'
    }
    const logo_p2 = {
      padding: '18px 16px 10px 0'
    }
    return (
      <div style={{lineHeight: '2px', border: '8px solid black', display: 'inline-block'}}>
        <p style={Object.assign({}, logo_p1 , logo_style)}>URBAN</p>
        <p style={Object.assign({}, logo_p2 , logo_style)}>SWEAT</p>
      </div>
    );
  }
}
