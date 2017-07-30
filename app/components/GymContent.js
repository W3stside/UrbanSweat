import React, {Component} from 'react'

// === APHRODITE CSS
import { StyleSheet, css } from 'aphrodite';

//COMPONENTS
import BackgroundPic from './BackgroundPic'
import CitySquares from './CitySquares'
import Header from './Header'
import SearchBar from './SearchBar'
import Slideshow from './Slideshow'

/**
// <GymText/> - returns descriptive text on Gym based on Props passed by <GymContent/>
// Props destructured a la ES6 destructuring syntax and equate: props.gymHeader && props.gymPOne, respectively
//
**/
const GymText = ({gymHeader,gymPOne}) => (
    <div className="flex flex1 fontP160 colNoWrap aCenter jStart width75 marginAuto italic textCenter">
      <div>
        <h2 className="width100" style={{display: "inline-block", backgroundColor:"lightgrey"}}>{gymHeader}</h2>
        <br/>
        <div className="fontP80 width100">{gymPOne}</div>
      </div>
    </div>
);

const GymPhotos = ({gymPhotos}) => (
  <div className="flex" style={{height: 450}}>
    <Slideshow />
  </div>
);

//Renders the main Gym Details based off of the first elem in the FilteredData Array returned by the Search dataInput
const GymDetails = ({categoriesByCity, categoriesSelected, currentFilteredDataArray, gymInstancesByCity}) => (
    //Check first that their are any elems in array and that it is NOT the cities
    currentFilteredDataArray.length && currentFilteredDataArray[0].data.gym
    ? <div className="flex colNoWrap fullWidthHeight mdP6">
        <div id="logoHeader" className="flex rowNoWrap jCenter aCenter" style={{minHeight: 120, maxHeight: 120}}>
          <img src={currentFilteredDataArray[0].data.gym.logo} style={{width: 120}}/>
          <h1 className={css(styles.fontDef, styles.header)} style={{padding: 12, textAlign: 'center', width: 'auto'}}>{currentFilteredDataArray[0].data.gym.name.toUpperCase()} </h1>
        </div>
        <GymPhotos gymPhotos={currentFilteredDataArray[0].data.gallery}/>
        <GymText gymHeader={currentFilteredDataArray[0].data.gym.name} gymPOne={currentFilteredDataArray[0].data.gym.summary}/>
      </div>
  : <img style={{minHeight: '100%', minWidth: '100%'}} src="http://31.media.tumblr.com/0c855ac97b211311541a2fad6b3042be/tumblr_nfi14mS6qx1stn28do1_1280.gif"/>
);

const GymContent = (props) => {
    //Cache Props passed from GymViewerPage
  const {categoriesByCity, categoriesSelected, currentFilteredDataArray, gymInstancesByCity} = props;

  return (
    <div className="flex rowWrap fullWidthHeight">

      <div className="flex colNoWrap smP12 mdP3 fullWidthHeight" style={{height: 800}}>
        <div className="flex aCenter jCenter width100" style={{minHeight: 120, maxHeight: 120}}>
          <SearchBar
            customAphrodite={styles.searchBarForm}
            placeholder='Find your spot'
            autoFocus={true}/>
        </div>
        <div id="gymSelectaWrapper" className="height100 overflowAuto">
          <div id="gymSelecta" className="flex colNoWrap aCenter jCenter width100">
            <CitySquares
              dataToFilter={gymInstancesByCity}
              verticalFade={true}/>
          </div>
        </div>
      </div>

      <div id="gymDetails" className="flex smP12 colNoWrap overflowXHidden" style={{flex: '1 700px'}}>
        <GymDetails
            categoriesByCity={categoriesByCity}
            categoriesSelected={categoriesSelected}
            currentFilteredDataArray={currentFilteredDataArray}
            gymInstancesByCity={gymInstancesByCity}
        />
      </div>

    </div>
  );
}

const styles = StyleSheet.create({
    defaultFont: {
        color: 'black',
        font: 'italic 150% "Helvetica"',
        textAlign: 'center'
    },
    header: {
        textShadow: '0px 0px 8px rgba(0,0,0,0.3)'
    },
})
export default GymContent;
