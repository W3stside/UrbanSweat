import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';

////////////////////////////////////////
// Styling - Aphrodite
///////////////////////////////////////

const styles = StyleSheet.create({
  p: {
    color: 'ghostwhite',
    font: 'Helvetica',
    fontStyle: 'italic',
    fontWeight: '400'
  },
  padding_0: {
    padding: '0',
    transition: 'all 2s linear',
    width: '100%'
  },
  strikethroughHover: {
    ':hover': {
      textDecoration: 'line-through',
      textShadow: '0 0 2px #10FF8C'
    }
  },
  opacity_0: {
    opacity: '0'
  },
  searchBar: {
    ':focus': {
      boxShadow: '0px 0px 45px -7px #10FF8C'
    },
    font: 'italic 100% Helvetica',
    border: '5px solid ghostwhite',
    borderRadius: 18,
    padding: 5,
    boxShadow: '0px 0px 45px -7px black',
    outline: 'none !important'
  },
  hideList: {
    height: '0',
    overflow: 'hidden'
  },
  showList: {
    display: 'flex', flex: 1,
    height: '100%', minWidth: '33.33%'
  },
  fullWidth: {
    textAlign: 'center',
    width: '100%'
  },
  logoStyle: {
    margin : '8%',
    width : '30vh'
  },
  cityChooserHeader: {
    fontSize: '120%',
    position: 'static',
    zIndex: '1',
    color: 'black',
    margin: '0 0 40px 0'
  },
  smallCityChooserHeader: {
    color: 'ghostwhite',
    font: 'italic bold 250% "Helvetica"',
    margin: '0 0 15px 0',
    position: 'static',
    zIndex: '5'
  },
  movingOptionsHeader: {
    fontSize: '125%',
    lineHeight: '0.5',
    position: 'static',
    zIndex: '5'
   },
  citySquareContainerStyle: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column nowrap',
    height: 'auto', width: '100%', minHeight: 350,
    position: 'relative',
    overflow: 'hidden',
    padding: '10% 0'
  },
  movingOptionsStyle: {
    listStyle: 'none',
    color: 'white',
    paddingLeft: '0',
    margin: '0',
    fontSize: '140%',
    fontStyle: 'italic',
    lineHeight: '1'
 }
});

const opacityKeyframes = {
    'from': {
        opacity: 0,
    },

    'to': {
        opacity: 1,
    }
};

const animationStyles = StyleSheet.create({
  movingOptionsKeyFrames: {
    animationName: opacityKeyframes,
    animationDuration: '1.2s'
  }
})

export default class Header extends Component {

  static propTypes () {
    styleName: React.PropType.object
  }

  render() {
    return <p className={css(this.props.style)}>{this.props.name}</p>;
  }
}
