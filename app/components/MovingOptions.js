import React, {Component} from 'react'

import { StyleSheet, css } from 'aphrodite'

/** MovingOptions semi-smart
* Component Purpose:
*  >>> Maps through activities ARRAY (see bottom) to build a DYNAMIC LIST
*  >>> Build an <li> with all proper aphrodite css classes and parameteres required i.e activity.url + activity.title as stated
*/
export default function MovingOptions (props) {
  let City = props.categories;
  let listActivities = () => {
    if (City === null || City === []) return;
    return (
      City.map (
      (activity, index) =>
        <li className={props.hoverState ? css(animationStyles.movingOptionsKeyFrames) : css(styles.opacity_0)} key={index}>
          <a className={css(styles.strikethroughHover)} href={'#'} style={{color: 'white'}}>
            {activity.name}
          </a>
        </li>
      )
    );
  }
    return (
      <ul className={css(props.style)}>
          {listActivities()}
      </ul>
   );
}

////////////////////////////////////////
// Styling - Aphrodite
///////////////////////////////////////

const styles = StyleSheet.create({
  strikethroughHover: {
    ':hover': {
      textDecoration: 'line-through',
      textShadow: '0 0 2px #10FF8C'
    }
  },
  opacity_0: {
    opacity: '0',
    transition: 'all 0.3s linear'
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
