import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/Actions'
import { StyleSheet, css } from 'aphrodite';

import Logo from './Logo'
import BackgroundPic from './BackgroundPic'
import HamburgerMenu from './HamburgerMenu'

//data
import { Activities } from '../data/activities'

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
    margin: '15px 0 0 0',
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
    height: 'auto', width: '100%',
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

////////////////////////////////////////
// End of Styling - Aphrodite
///////////////////////////////////////

export default class CityChooser extends React.Component {
  render () {
    return (
      <div style={{display: 'flex', flexFlow: 'column wrap'}}>
        <div>
          <div className={css(styles.fullWidth)}>

            <div className={'col-xs-12' + ' ' + css(styles.padding_0)}>
               <HamburgerMenu />
               <Logo style={styles.logoStyle}/>
            </div>

          </div>
        </div>

        <div className="citychooser" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
          <div className={css(styles.fullWidth)}>

            <div className={'col-xs-12' + ' ' + css(styles.padding_0)}>
              <Header name="Choose Your City" style={styles.cityChooserHeader}/>
            </div>

            <SearchBar
              cities={cities}
              placeholder='Find your spot'
             />

          </div>
        </div>
      </div>
    );
  }
}

class Header extends React.Component {

  static propTypes () {
    styleName: React.PropType.object
  }

  render() {
    return <p className={css(this.props.style)}>{this.props.name}</p>;
  }
}

/** HoverStateContainer Notes
* Smart Container - contains no hard coded content - ALL THIS COMP DOES IS PASS THE STATE: HOVER true or false TO CHILDREN
* Takes children as Props - meaning it is like a <div> CHILDREN HERE </div>
* When mouse enters this div - sets State as hoverState === true // When mouse leaves sets hoverState === false
* // IMPORTANT //
* the childrenWithProps variable in the render function MAPS all children passed in with the hoverState prop - aka passes state to them
* The actual OUTPUT is what you pass in between <HoverStateContainer> </HoverStateContainer> - see const cities = {object} as a reference at bottom
*/
class HoverStateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverState: false
    }
    this._handleMouseEnter = this._handleMouseEnter.bind(this)
    this._handleMouseLeave = this._handleMouseLeave.bind(this)
  }

  _handleMouseEnter() {
    this.setState (
      {
        hoverState: true
      }
    );
  }

  _handleMouseLeave () {
    this.setState (
      {
        hoverState: false
      }
    );
  }

  render() {

    var childrenWithProps = React.Children.map( this.props.children ,
      ( child ) => React.cloneElement( child , {
        hoverState: this.state.hoverState
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

/** MovingOptions semi-smart
* Component Purpose:
*  >>> Maps through activities ARRAY (see bottom) to build a DYNAMIC LIST
*  >>> Build an <li> with all proper aphrodite css classes and parameteres required i.e activity.url + activity.title as stated
*/
function MovingOptions (props) {
  const activities = props.activities;
  const listActivities = activities.map (
    (activity, index) =>
      <li className={props.hoverState ? css(animationStyles.movingOptionsKeyFrames) : css(styles.opacity_0)} key={index}>
        <a className={css(styles.strikethroughHover)} href={activity.url} style={{color: 'white'}}>{activity.title}</a>
      </li>
    );
    return (
      <ul className={css(props.style)}>
          {listActivities}
      </ul>
   );
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInput: ''
    }
    this._handleInputText = this._handleInputText.bind(this);
  }

  _handleInputText(input) {
    this.setState({
      dataInput: input.target.value
    });
  }

  render () {

    let filteredCities = this.props.cities.filter(
      (city) => {
        return city.name.toLowerCase().indexOf(this.state.dataInput.toLowerCase()) !== -1;
      }
    );
    var hideShowList = css(
      this.state.dataInput ? styles.showList : styles.hideList
    );

    return (
      <div style={{width:'100%'}}>

        <form>
           <input
             type='text'
             value={this.state.dataInput}
             onChange={this._handleInputText}
             placeholder={this.props.placeholder}
             />
        </form>

        <div style={{marginTop: 40, display: 'flex', flexFlow:'row wrap', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
          {filteredCities.map(
            (city, index) =>
              <div className={hideShowList}>
                <div className={css(styles.padding_0)}
                  key={index}>
                    {city.name && city.component ? city.component : city.name}
                </div>
              </div>
            )}
        </div>

      </div>
    );
  }
}

const cities = [
  {
    id: 1,
    name: 'Paris',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                 <BackgroundPic />
                 <Header name="PARIS" style={styles.smallCityChooserHeader}/>
                 <MovingOptions stateHover = {null} activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 2,
    name: 'Amsterdam',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                 <BackgroundPic image={"http://minimalblogs.com/wp-content/uploads/IMG_6224.jpg"}/>
                 <Header name="AMSTERDAM" style={styles.smallCityChooserHeader} />
                 <MovingOptions activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 3,
    name: 'Copenhagen',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://farm6.static.flickr.com/5581/14036964225_40dbb3e429_b.jpg"}/>
                <Header name="COPENHAGEN" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 4,
    name: 'Brussels',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://c1.staticflickr.com/3/2049/2442825439_0ce24be7db_o.jpg"}/>
                <Header name="BRUSSELS" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 5,
    name: 'Berlin',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8c8c845227921.5829f6ff5a2f0.jpg"}/>
                <Header name="BERLIN" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 6,
    name: 'London',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://static1.squarespace.com/static/55c5a739e4b0d93b6174fb9e/573ac25d2b8dde95f0ee1a40/573b9c7907eaa096db954ede/1463524544831/DSCF9868-Edit-1-3.jpg"}/>
                <Header name="LONDON" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  }
]
