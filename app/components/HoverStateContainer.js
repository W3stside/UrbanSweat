import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';

/** HoverStateContainer Notes
* Smart Container - contains no hard coded content - ALL THIS COMP DOES IS PASS THE STATE: HOVER true or false TO CHILDREN
* Takes children as Props - meaning it is like a <div> CHILDREN HERE </div>
* When mouse enters this div - sets State as hoverState === true // When mouse leaves sets hoverState === false
* // IMPORTANT //
* the childrenWithProps variable in the render function MAPS all children passed in with the hoverState prop - aka passes state to them
* The actual OUTPUT is what you pass in between <HoverStateContainer> </HoverStateContainer> - see const cities = {object} as a reference at bottom
*/
export default class HoverStateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverState: false
    }
    this._handleMouseEnter = this._handleMouseEnter.bind(this)
    this._handleMouseLeave = this._handleMouseLeave.bind(this)
  }

  _handleMouseEnter() {
    // this.setState (
    //   {
    //     hoverState: true
    //   }
    // );
  }

  _handleMouseLeave () {
    // this.setState (
    //   {
    //     hoverState: false
    //   }
    // );
  }

  render() {

    var childrenWithProps = React.Children.map( this.props.children ,
      ( child ) => React.cloneElement( child , {
        // hoverState: this.state.hoverState
      })
    );

    return (
      <div
        onMouseEnter = {
          this._handleMouseEnter
        }
        onMouseLeave = {
          this._handleMouseLeave
        }
        className = {css(this.props.style)}
      >

        {childrenWithProps}

      </div>
    );
  }
}
