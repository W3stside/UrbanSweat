//React imports
import React, {Component, PropTypes} from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'


// === SET default ELEM style
const getDefaultStyles = () => {
  //pull in cities from State Object
  this.props.dataToFilter.map( (city) => (
    {data: {...city},
    style: {
      opacity: 0,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      //height: 0,
    }}) );
}
// === END STYLING + Actual ELEM mapping and building section
const getStyles = () => {
  const {dataToFilter, dataInput} = this.props;
  //take initial data and return FILTERED Array
  const filteredData = dataToFilter.filter( (item) => {
    let name = item.name ? item.name : item.gym.name;
    if (dataInput.toLowerCase() === "all") {
      return name;
    }
    return name.toLowerCase().indexOf(dataInput.toLowerCase()) > -1;
  })
  .map( (item, index) => {
    let name = item.name ? item.name : item.gym.name;
    return {
      key: name,
      data: {
        ...item
      },
      style: {
        opacity: spring(1, presets.gentle),
        flexGrow: spring(1, presets.gentle),
        flexShrink: spring(1, presets.gentle),
        flexBasis: spring(300, presets.gentle),
        //height: 337,
      }
    }
  });
  //Pass the newly filtered Array to Actions to Reduce to State
  this.handleFilteredData(filteredData);
  return filteredData;
}
// === Styling for ELEM entry
const willEnter = () => {
  return {
    opacity: 1,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 0,
    //height: 0
  };
};
// === Styling for ELEM exit
const willLeave = () => {
  return {
    opacity: spring(0),
    flexGrow: spring(0),
    flexShrink: spring(0),
    flexBasis: spring(0),
    //height: spring(337)
  }
};

//Data passed in via dataToFilter prop MUST be pointing at the correct slices of data before getting HERE
const TransitionContainer = ({children}) => (
  <TransitionMotion
  defaultStyles={getDefaultStyles}
  styles={getStyles}
  willEnter={willEnter}
  willLeave={willLeave}>
    {motionContent =>
      <div>
        {motionContent.map( ( {key, style, data, index} ) => (
          <div key={key} style={style}>
            {data.children}
          </div>
        ))};
      </div>
    }
  </TransitionMotion>
);
