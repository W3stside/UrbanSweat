import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/Actions'
import { StyleSheet, css } from 'aphrodite';

import Logo from './Logo'
import BackgroundPic from './BackgroundPic'
import HamburgerMenu from './HamburgerMenu'
import SearchBar from './SearchBar'

//data
//import { Gyms } from '../data/gyms/gym'

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

////////////////////////////////////////
// End of Styling - Aphrodite
///////////////////////////////////////

export default class CityChooser extends Component {
  render () {
    return (
      <div style={{display: 'flex', flexFlow: 'column wrap'}}>
        <div>
          <div className={css(styles.fullWidth)}>

            <div className={css(styles.padding_0)}>
               <HamburgerMenu />
               <Logo style={styles.logoStyle}/>
            </div>

          </div>
        </div>

        <div className="citychooser">
          <div className={css(styles.fullWidth)}>

            <div className={css(styles.padding_0)}>
              <Header name="Choose Your City" style={styles.cityChooserHeader}/>
            </div>

            <SearchBar
              cities={Gyms}
              placeholder='Find your spot'
              className={css(styles.searchBar)}
             />

          </div>
        </div>
      </div>
    );
  }
}

export class Header extends Component {

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
export class HoverStateContainer extends Component {
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
export function MovingOptions (props) {
  let City = Gyms[0].cities[props.index];
  //console.log(Gyms);
  let listActivities = City.categories.map (
    (activity, index) =>
      <li className={props.hoverState ? css(animationStyles.movingOptionsKeyFrames) : css(styles.opacity_0)} key={index}>
        <a className={css(styles.strikethroughHover)} href={'#'} style={{color: 'white'}}>
          {activity['category']}
        </a>
      </li>
    )


  /*cities.map (
    (city, i) =>
      <li className={props.hoverState ? css(animationStyles.movingOptionsKeyFrames) : css(styles.opacity_0)} key={i}>
        <a className={css(styles.strikethroughHover)} href={city.name} style={{color: 'white'}}>{city.categories.category}</a>
      </li>
    );*/
    return (
      <ul className={css(props.style)}>
          {listActivities}
      </ul>
   );
}

const Gyms = [
  {"cities": [
    {
      "name": "Paris",
      "component":
      <HoverStateContainer style={styles.citySquareContainerStyle}>
       <BackgroundPic image={"https://s-media-cache-ak0.pinimg.com/736x/12/0b/d5/120bd5a09bb9991811f382ee0eba70ca.jpg"}/>
       <Header name="PARIS" style={styles.smallCityChooserHeader}/>
       <MovingOptions index={0} activities={'placeholder'} style={styles.movingOptionsStyle}/>
     </HoverStateContainer>
      ,
      "categories": [
        {
          "category": "STRENGTH",
          "gyms": [
            {
              "name": "Max-Out FITNESS",
              "activities": [
                {title: 'YOGA', url: "#"},
                {title: 'WEIGHTLIFTING', url: "#"},
                {title: 'CROSSFIT', url: "#"},
                {title: 'DANCE', url: "#"},
                {title: 'BOXING', url: "#"},
                {title: '...MORE', url: "#"}
              ],
              "key": 1,
              "description": {
                "name": "Max-Out FITNESS",
                "image_urls": [
                  "https://cdn.theculturetrip.com/wp-content/uploads/2016/11/inside-the-paris-navigating-gym--carlo-ratti-associati-1024x512.jpg",
                  "https://s-media-cache-ak0.pinimg.com/736x/1a/42/de/1a42de6b58d700347c3571cbb5118082.jpg",
                  'https://s-media-cache-ak0.pinimg.com/originals/83/51/5a/83515af36bf742d7b42664347f55195e.jpg',
                  'https://static.dezeen.com/uploads/2016/01/The-Burrow-boxing-club_Kuwait_Lab100-Design-Studio_gym_interiors_dezeen_1568_10.jpg',
                  'http://www.boredart.com/wp-content/uploads/2015/07/gym-interiors-13.jpg'
                ],
                "text": {
                  "header": "MAX-OUT FITNESS",
                  "pOne": "MAX-OUT FITNESS is Paris' premier gym for everything FITNESS. We have over 500 freeweights, 65 foldable benches, 40 ellipticals, 75 Smith machines, and 0 fucks to give about your excuse.",
                  "pTwo": "Every day playing sport is quite difficult for every peoples, for FITNESS you can spend at least half an hour in gym by doing some cardio exercise like treadmill, elliptical etc.. even you can work it out in home itself without any help. This will keep you active."
                }
              } //end descrip
            }
        ]}, //end FITNESS
        {
          "category": "CARDIO-DANCE",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "BOXING",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "JIU JITSU",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "X-FIT",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]} //end X-FIT
      ] //end categories
    }, //end City object
    {
      "name": "Berlin",
      "component":
      <HoverStateContainer style={styles.citySquareContainerStyle}>
       <BackgroundPic image={"https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8c8c845227921.5829f6ff5a2f0.jpg"} />
       <Header name="BERLIN" style={styles.smallCityChooserHeader}/>
       <MovingOptions index={1} activities={'placeholder'} style={styles.movingOptionsStyle}/>
     </HoverStateContainer>
      ,
      "categories": [
        {
          "category": "FITNESS",
          "gyms": [
            {
              "name": "Mitte FITNESS",
              "activities": [
                {title: 'YOGA', url: "#"},
                {title: 'WEIGHTLIFTING', url: "#"},
                {title: 'BOXING', url: "#"},
                {title: 'JIU JITSU', url: "#"},
                {title: 'CAPOUEIRA', url: "#"},
                {title: '...MORE', url: "#"}
              ],
              "key": 2,
              "description": {
                "name": "Mitte Fit",
                "image_urls": [
                  "https://cdn.theculturetrip.com/wp-content/uploads/2016/11/inside-the-paris-navigating-gym--carlo-ratti-associati-1024x512.jpg",
                  "https://s-media-cache-ak0.pinimg.com/736x/1a/42/de/1a42de6b58d700347c3571cbb5118082.jpg",
                  'https://s-media-cache-ak0.pinimg.com/originals/83/51/5a/83515af36bf742d7b42664347f55195e.jpg',
                  'https://static.dezeen.com/uploads/2016/01/The-Burrow-boxing-club_Kuwait_Lab100-Design-Studio_gym_interiors_dezeen_1568_10.jpg',
                  'http://www.boredart.com/wp-content/uploads/2015/07/gym-interiors-13.jpg'
                ],
                "text": {
                  "header": "Mitte Fit",
                  "pOne": "Mitte Fit is Berlin's premier gym for everything FITNESS. We have over 500 freeweights, 65 foldable benches, 40 ellipticals, 75 Smith machines, and 0 fucks to give about your excuse.",
                  "pTwo": "Every day playing sport is quite difficult for every peoples, for FITNESS you can spend at least half an hour in gym by doing some cardio exercise like treadmill, elliptical etc.. even you can work it out in home itself without any help. This will keep you active."
                }
              } //end descrip
            }
        ]}, //end FITNESS
        {
          "category": "CARDIO-DANCE",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "BOXING",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "JIU JITSU",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "X-FIT",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]} //end X-FIT
      ] //end categories
    }, //end City object
    {
      "name": "London",
      "component":
      <HoverStateContainer style={styles.citySquareContainerStyle}>
       <BackgroundPic image={"https://static1.squarespace.com/static/55c5a739e4b0d93b6174fb9e/573ac25d2b8dde95f0ee1a40/573b9c7907eaa096db954ede/1463524544831/DSCF9868-Edit-1-3.jpg"}/>
       <Header name="LONDON" style={styles.smallCityChooserHeader}/>
       <MovingOptions index={1} activities={'placeholder'} style={styles.movingOptionsStyle}/>
     </HoverStateContainer>
      ,
      "categories": [
        {
          "category": "FITNESS",
          "gyms": [
            {
              "name": "Mitte FITNESS",
              "activities": [
                {title: 'YOGA', url: "#"},
                {title: 'WEIGHTLIFTING', url: "#"},
                {title: 'BOXING', url: "#"},
                {title: 'JIU JITSU', url: "#"},
                {title: 'CAPOUEIRA', url: "#"},
                {title: '...MORE', url: "#"}
              ],
              "key": 2,
              "description": {
                "name": "Mitte Fit",
                "image_urls": [
                  "https://cdn.theculturetrip.com/wp-content/uploads/2016/11/inside-the-paris-navigating-gym--carlo-ratti-associati-1024x512.jpg",
                  "https://s-media-cache-ak0.pinimg.com/736x/1a/42/de/1a42de6b58d700347c3571cbb5118082.jpg",
                  'https://s-media-cache-ak0.pinimg.com/originals/83/51/5a/83515af36bf742d7b42664347f55195e.jpg',
                  'https://static.dezeen.com/uploads/2016/01/The-Burrow-boxing-club_Kuwait_Lab100-Design-Studio_gym_interiors_dezeen_1568_10.jpg',
                  'http://www.boredart.com/wp-content/uploads/2015/07/gym-interiors-13.jpg'
                ],
                "text": {
                  "header": "Mitte Fit",
                  "pOne": "Mitte Fit is Berlin's premier gym for everything FITNESS. We have over 500 freeweights, 65 foldable benches, 40 ellipticals, 75 Smith machines, and 0 fucks to give about your excuse.",
                  "pTwo": "Every day playing sport is quite difficult for every peoples, for FITNESS you can spend at least half an hour in gym by doing some cardio exercise like treadmill, elliptical etc.. even you can work it out in home itself without any help. This will keep you active."
                }
              } //end descrip
            }
        ]}, //end FITNESS
        {
          "category": "CARDIO-DANCE",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "BOXING",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "JIU JITSU",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "X-FIT",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]} //end X-FIT
      ] //end categories
    }, //end City object
    {
      "name": "COPENHAGEN",
      "component":
      <HoverStateContainer style={styles.citySquareContainerStyle}>
       <BackgroundPic image={"https://static.dezeen.com/uploads/2015/11/Rigshospitalet_3XN_Copenhagen_hospital-carpark_dezeen_936_4.jpg"}/>
       <Header name="COPENHAGEN" style={styles.smallCityChooserHeader}/>
       <MovingOptions index={1} activities={'placeholder'} style={styles.movingOptionsStyle}/>
     </HoverStateContainer>
      ,
      "categories": [
        {
          "category": "FITNESS",
          "gyms": [
            {
              "name": "Mitte FITNESS",
              "activities": [
                {title: 'YOGA', url: "#"},
                {title: 'WEIGHTLIFTING', url: "#"},
                {title: 'BOXING', url: "#"},
                {title: 'JIU JITSU', url: "#"},
                {title: 'CAPOUEIRA', url: "#"},
                {title: '...MORE', url: "#"}
              ],
              "key": 2,
              "description": {
                "name": "Mitte Fit",
                "image_urls": [
                  "https://cdn.theculturetrip.com/wp-content/uploads/2016/11/inside-the-paris-navigating-gym--carlo-ratti-associati-1024x512.jpg",
                  "https://s-media-cache-ak0.pinimg.com/736x/1a/42/de/1a42de6b58d700347c3571cbb5118082.jpg",
                  'https://s-media-cache-ak0.pinimg.com/originals/83/51/5a/83515af36bf742d7b42664347f55195e.jpg',
                  'https://static.dezeen.com/uploads/2016/01/The-Burrow-boxing-club_Kuwait_Lab100-Design-Studio_gym_interiors_dezeen_1568_10.jpg',
                  'http://www.boredart.com/wp-content/uploads/2015/07/gym-interiors-13.jpg'
                ],
                "text": {
                  "header": "Mitte Fit",
                  "pOne": "Mitte Fit is Berlin's premier gym for everything FITNESS. We have over 500 freeweights, 65 foldable benches, 40 ellipticals, 75 Smith machines, and 0 fucks to give about your excuse.",
                  "pTwo": "Every day playing sport is quite difficult for every peoples, for FITNESS you can spend at least half an hour in gym by doing some cardio exercise like treadmill, elliptical etc.. even you can work it out in home itself without any help. This will keep you active."
                }
              } //end descrip
            }
        ]}, //end FITNESS
        {
          "category": "CARDIO-DANCE",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "BOXING",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "JIU JITSU",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "X-FIT",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]} //end X-FIT
      ] //end categories
    }, //end City object
    {
      "name": "AMSTERDAM",
      "component":
      <HoverStateContainer style={styles.citySquareContainerStyle}>
       <BackgroundPic image={"http://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2015/09/inspiration-StudioAA-Amsterdam.jpg"} />
       <Header name="AMSTERDAM" style={styles.smallCityChooserHeader}/>
       <MovingOptions index={1} activities={'placeholder'} style={styles.movingOptionsStyle}/>
     </HoverStateContainer>
      ,
      "categories": [
        {
          "category": "FITNESS",
          "gyms": [
            {
              "name": "Mitte FITNESS",
              "activities": [
                {title: 'YOGA', url: "#"},
                {title: 'WEIGHTLIFTING', url: "#"},
                {title: 'BOXING', url: "#"},
                {title: 'JIU JITSU', url: "#"},
                {title: 'CAPOUEIRA', url: "#"},
                {title: '...MORE', url: "#"}
              ],
              "key": 2,
              "description": {
                "name": "Mitte Fit",
                "image_urls": [
                  "https://cdn.theculturetrip.com/wp-content/uploads/2016/11/inside-the-paris-navigating-gym--carlo-ratti-associati-1024x512.jpg",
                  "https://s-media-cache-ak0.pinimg.com/736x/1a/42/de/1a42de6b58d700347c3571cbb5118082.jpg",
                  'https://s-media-cache-ak0.pinimg.com/originals/83/51/5a/83515af36bf742d7b42664347f55195e.jpg',
                  'https://static.dezeen.com/uploads/2016/01/The-Burrow-boxing-club_Kuwait_Lab100-Design-Studio_gym_interiors_dezeen_1568_10.jpg',
                  'http://www.boredart.com/wp-content/uploads/2015/07/gym-interiors-13.jpg'
                ],
                "text": {
                  "header": "Mitte Fit",
                  "pOne": "Mitte Fit is Berlin's premier gym for everything FITNESS. We have over 500 freeweights, 65 foldable benches, 40 ellipticals, 75 Smith machines, and 0 fucks to give about your excuse.",
                  "pTwo": "Every day playing sport is quite difficult for every peoples, for FITNESS you can spend at least half an hour in gym by doing some cardio exercise like treadmill, elliptical etc.. even you can work it out in home itself without any help. This will keep you active."
                }
              } //end descrip
            }
        ]}, //end FITNESS
        {
          "category": "CARDIO-DANCE",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "BOXING",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "JIU JITSU",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "X-FIT",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]} //end X-FIT
      ] //end categories
    }, //end City object
    {
      "name": "BRUSSELS",
      "component":
      <HoverStateContainer style={styles.citySquareContainerStyle}>
       <BackgroundPic image={"https://images.divisare.com/image/upload/c_fit,f_jpg,q_80,w_1200/v1/project_images/2822394/02_MDW_LeLorrain_%C2%A9Julien-Lanoo.jpg"} />
       <Header name="BRUSSELS" style={styles.smallCityChooserHeader}/>
       <MovingOptions index={1} activities={'placeholder'} style={styles.movingOptionsStyle}/>
     </HoverStateContainer>
      ,
      "categories": [
        {
          "category": "FITNESS",
          "gyms": [
            {
              "name": "Mitte FITNESS",
              "activities": [
                {title: 'YOGA', url: "#"},
                {title: 'WEIGHTLIFTING', url: "#"},
                {title: 'BOXING', url: "#"},
                {title: 'JIU JITSU', url: "#"},
                {title: 'CAPOUEIRA', url: "#"},
                {title: '...MORE', url: "#"}
              ],
              "key": 2,
              "description": {
                "name": "Mitte Fit",
                "image_urls": [
                  "https://cdn.theculturetrip.com/wp-content/uploads/2016/11/inside-the-paris-navigating-gym--carlo-ratti-associati-1024x512.jpg",
                  "https://s-media-cache-ak0.pinimg.com/736x/1a/42/de/1a42de6b58d700347c3571cbb5118082.jpg",
                  'https://s-media-cache-ak0.pinimg.com/originals/83/51/5a/83515af36bf742d7b42664347f55195e.jpg',
                  'https://static.dezeen.com/uploads/2016/01/The-Burrow-boxing-club_Kuwait_Lab100-Design-Studio_gym_interiors_dezeen_1568_10.jpg',
                  'http://www.boredart.com/wp-content/uploads/2015/07/gym-interiors-13.jpg'
                ],
                "text": {
                  "header": "Mitte Fit",
                  "pOne": "Mitte Fit is Berlin's premier gym for everything FITNESS. We have over 500 freeweights, 65 foldable benches, 40 ellipticals, 75 Smith machines, and 0 fucks to give about your excuse.",
                  "pTwo": "Every day playing sport is quite difficult for every peoples, for FITNESS you can spend at least half an hour in gym by doing some cardio exercise like treadmill, elliptical etc.. even you can work it out in home itself without any help. This will keep you active."
                }
              } //end descrip
            }
        ]}, //end FITNESS
        {
          "category": "CARDIO-DANCE",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "BOXING",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "JIU JITSU",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]}, //end Boxing
        {
          "category": "X-FIT",
          "gyms": [
            {
              "name": null,
              "activities": [null,null,null,null,null],
              "key": null,
              "description": {
                "name": null,
                "image_urls": [null, null, null, null, null],
                "text": {"header": null, "pOne": null, "pTwo": null}
              } //end descrip
            }
        ]} //end X-FIT
      ] //end categories
    }
  ]}//end cities
];

/*const cities = [
  {
    id: 1,
    name: 'Paris',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                 <BackgroundPic />
                 <Header name="Paris" style={styles.smallCityChooserHeader}/>
                 <MovingOptions stateHover={null} activities={Gyms} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 2,
    name: 'Amsterdam',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                 <BackgroundPic image={"http://minimalblogs.com/wp-content/uploads/IMG_6224.jpg"}/>
                 <Header name="AMSTERDAM" style={styles.smallCityChooserHeader} />
                 <MovingOptions activities={Gyms} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 3,
    name: 'Copenhagen',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://farm6.static.flickr.com/5581/14036964225_40dbb3e429_b.jpg"}/>
                <Header name="COPENHAGEN" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Gyms} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 4,
    name: 'Brussels',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://c1.staticflickr.com/3/2049/2442825439_0ce24be7db_o.jpg"}/>
                <Header name="BRUSSELS" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Gyms} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 5,
    name: 'Berlin',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8c8c845227921.5829f6ff5a2f0.jpg"}/>
                <Header name="BERLIN" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Gyms} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 6,
    name: 'London',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://static1.squarespace.com/static/55c5a739e4b0d93b6174fb9e/573ac25d2b8dde95f0ee1a40/573b9c7907eaa096db954ede/1463524544831/DSCF9868-Edit-1-3.jpg"}/>
                <Header name="LONDON" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Gyms} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  }
]
*/
