import React, { Component } from 'react';
import {StyleSheet,css} from 'aphrodite';

const BackgroundPic = ({image, styleBG, customAphrodite}) => (
  /*<div className={css(styles.bgPicContainer)}>*/
  <div className={css(customAphrodite)}>
    <img src={image} className={css(styles.bgPic)} style={styleBG}/>
  </div>
);

const styles = StyleSheet.create({
  bgPicContainer: {
    position: 'absolute', left: 0,
    height: '100%',
    minWidth: '100%', minHeight: '100%',
    overflow: 'hidden',
    zIndex: '-99999'
  },
  bgPic: {
    //width: '100%',
    minWidth: '100%', minHeight: '100%',
    filter: 'brightness(80%)',
  }
})

BackgroundPic.propType = {
  image: React.PropTypes.string.isrequired
}
BackgroundPic.defaultProps = {
  image: require("../assets/berlin-stadion-min.jpg"),
  customAphrodite: styles.bgPicContainer
}

export default BackgroundPic;
