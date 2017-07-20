//REACT
import React from 'react';
//MOTION
import { TransitionMotion, spring, presets } from 'react-motion';

const willEnter = () => ({
  opacity: 0,
  scale: 0.2
});

const willLeave = () => ({
  opacity: spring(0),
  scale: spring(1.02)
});

const getStyles = () => ({
  opacity: spring(1, presets.gentle),
  scale: spring(1, presets.gentle)
});

const RouteTransition = ({ children: child, pathname }) => (
  <TransitionMotion
    styles={ [{
      key: pathname,
      style: getStyles(),
      data: { child }
    }] }
    willEnter={ willEnter }
    willLeave={ willLeave }
  >
    { (interpolated) =>
      <div>
        { interpolated.map(({ key, style, data }) =>
          <div
            className="fullWidthHeight"
            key={ `${key}-transition` }
            style={ {
              opacity: style.opacity,
              transform: `scale(${style.scale})`
            } }
          >
            { data.child }
          </div>
        ) }
      </div>
    }
  </TransitionMotion>
);

export default RouteTransition;
