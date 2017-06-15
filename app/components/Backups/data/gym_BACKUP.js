//gym json

//Gyms[0].cities[0].Paris[0].categories[0].Fitness[0].Gym.description.image_urls ===> gets gym1 name printed

import React, {Component} from 'react'

import {HoverStateContainer} from '../../components/CityChooser'
import {Header} from '../../components/CityChooser'
import {MovingOptions} from '../../components/CityChooser'
import BackgroundPic from '../../components/BackgroundPic'
import { StyleSheet, css } from 'aphrodite';

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

export const Gyms = [
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
