import React, { Component } from 'react';
import {StyleSheet,css} from 'aphrodite';

const BackgroundPic = ({image, styleBG}) => (
  <div className={css(styles.bgPicContainer)}>
    <img src={image} className={css(styles.bgPic)} style={styleBG}/>
  </div>
);

BackgroundPic.propType = {
  image: React.PropTypes.string.isrequired
}
BackgroundPic.defaultProps = {
  image: require("../img/berlin-stadion-min.jpg")
}

const styles = StyleSheet.create({
  bgPicContainer: {
    position: 'absolute',
    width: '100%', height: '100%', left: 0,
    overflow: 'hidden',
    zIndex: '-99999'
  },
  bgPic: {
    minWidth: '100%', height: 'auto',
    filter: 'brightness(80%)',
    '@media (max-width: 550px)': {
      height: '100%'
    }
  }
})

export default BackgroundPic;
