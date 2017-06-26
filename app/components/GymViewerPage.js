import React, {Component} from 'react'

// === REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as gymInstanceActions from '../actions/gymInstanceActions'
import * as cityActions from '../actions/cityActions'
import * as categoryActions from '../actions/categoryActions'
import * as AllActions from '../actions/Actions'
import * as hamburgerMenuActions from '../actions/hamburgerMenuActions'

const Actions = {
  fetchCategoriesByCity: categoryActions.fetchCategoriesByCity,
  fetchGymInstance: gymInstanceActions.fetchGymInstance,
  fetchGymInstancesByCity: gymInstanceActions.fetchGymInstancesByCity,
  fetchCity: cityActions.fetchCity,
  fetchCityById: cityActions.fetchCityById,
  handleDataInput: AllActions.handleDataInput,
  handleMenuClick: hamburgerMenuActions.handleMenuClick,
}
// === COMPONENTS
import BackgroundPic from './BackgroundPic'
import CitySquares from './CitySquares'
import HamburgerMenu from './HamburgerMenu'
import Header from './Header'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Slideshow from './Slideshow'

// === APHRODITE CSS
import { StyleSheet, css } from 'aphrodite';
import { Gyms } from '../data/gyms/gym.js';


class GymViewerPage extends React.Component {

  componentDidMount() {
    //pass routerParam id (name of city) to aSync gymInstance call
    Promise.resolve(this.props.fetchGymInstancesByCity(this.props.routeParams.id))
      .then((resp) => {
        this.props.fetchCategoriesByCity(this.props.routeParams.id);
      })
      .then((resp) => {
        this.props.fetchCityById(this.props.routeParams.id)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentWillUnmount () {
    //reset dataInput in form search bar to nothing
    this.props.handleDataInput('');
    //if burger menu is open, close it
    this.props.handleMenuClick(true);
  }

  render () {
    const {categoriesByCity, currentFilteredDataArray, gymInstancesByCity, fetchingCities, fetchingCategories, fetchingGymInstances} = this.props;
    //ASync conditional - if currently fetching data, render spinner
    if (fetchingCategories) {
      return (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%'}}>
          <img src="http://31.media.tumblr.com/0c855ac97b211311541a2fad6b3042be/tumblr_nfi14mS6qx1stn28do1_1280.gif" style={{height: '100%', width: '100%'}}/>
        </div>
    )}
    return (
      <div className={css(styles.flexContainer, styles.colWrap, styles.fullWidthHeight)}>
          {/*Top 100% section*/}
          <div className={css(styles.flexContainer, styles.flexItemFullWidth, styles.flex20, styles.justifyCenter, styles.alignChildrenTop, styles.fullHeight)}>
                <HamburgerMenu />
                <BackgroundPic image={this.props.currentCity.bgImageURL}/>
                <div style={{display: 'flex', flexDirection: 'row nowrap', justifyContent: 'center', alignItems:'center', height: '100%'}}>
                  <Logo styleLogo={{maxWidth: '30vh'}}/>
                  <h1 style={{font: 'bold italic 320% "Helvetica"', color: 'white', marginLeft: -40}}> x {this.props.routeParams.id.toUpperCase()} </h1>
                </div>
          </div >

          {/*Bottom 100% section*/}
          <GymContent
            categoriesByCity={categoriesByCity}
            currentFilteredDataArray={currentFilteredDataArray}
            catDataInput={this.props.catDataInput}
            gymInstancesByCity={gymInstancesByCity}/>
      </div> //end main div
    );
  }
}

const GymText = ({gymHeader,gymPOne,gymPTwo}) => (

    <div className={css(styles.flexContainer, styles.minWidth, styles.flex1, styles.alignChildrenCenter, styles.justifyCenter, styles.colWrap, styles.defaultFont)}>
      <div>
        <h2 style={{width: '100%', display: "inline-block", backgroundColor:"lightgrey"}}>{gymHeader}</h2>
        <br/>
        <div style={{fontSize: '80%', width: '100%'}}>{gymPOne}</div>
      </div>
    </div>
)

const GymPhotos = ({gymPhotos}) => (
  <div className={css(styles.flexContainer, styles.minWidth, styles.flex1)} style={{minHeight: 330}}>
    <Slideshow />
  </div>
)

function GymContent (props) {
  const {categoriesByCity, currentFilteredDataArray, gymInstancesByCity} = props;

  const gymRendererArray = gymInstancesByCity.map( (gym, index) =>
    <div key={index} className={css(styles.flexContainer, styles.colWrap, styles.fullWidthHeight, styles.flex90)} >
      <h1> HELLO WORLD </h1>
      <GymPhotos gymPhotos={gym.gallery}/>
      <GymText gymHeader={gym.gym.name} gymPOne={gym.gym.summary}/>
    </div>
  );
  //CONDITIONAL RENDER for the left side Gyms to scoll through
  const gymSquareRenderer = gymInstancesByCity.length
    ? gymInstancesByCity.map( (inst, index) =>
        <div key={index} className={css(styles.flex10, styles.centerFlexContainer)}>
          <BackgroundPic image={inst.bgImageURL} />
          <Header name={inst.gym.name} />
        </div>
      )
    : <div className={css(styles.flex10, styles.centerFlexContainer)}>
        <img src="http://i.imgur.com/EZqOrRN.gif"/>;
      </div>;

  //Renders the main Gym Details based off of the first elem in the FilteredData Array returned by the Search dataInput
  const gymDetailsToRender = () => (
      //Check first that their are any elems in array and that it is NOT the cities
      currentFilteredDataArray.length && currentFilteredDataArray[0].data.gym
      ? <div className={css(styles.flexContainer, styles.colWrap, styles.fullWidthHeight, styles.flex90)} >
          <div id="logoHeader" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minHeight: 64, maxHeight: 64}}>
            <img src={currentFilteredDataArray[0].data.gym.logo} style={{width: 120}}/>
            <h1 className={css(styles.fontDef, styles.header)} style={{padding: 12, textAlign: 'center', width: 'auto'}}>{currentFilteredDataArray[0].data.gym.name.toUpperCase()} </h1>
            <img src={currentFilteredDataArray[0].data.gym.logo} style={{width: 120}}/>
          </div>
          <GymPhotos gymPhotos={currentFilteredDataArray[0].data.gallery}/>
          <GymText gymHeader={currentFilteredDataArray[0].data.gym.name} gymPOne={currentFilteredDataArray[0].data.gym.summary}/>
        </div>
    : <img style={{width: 100}} src="http://31.media.tumblr.com/0c855ac97b211311541a2fad6b3042be/tumblr_nfi14mS6qx1stn28do1_1280.gif"/>
  );
  return (
    <div style={{display: 'flex', flex: '1 1 75%', padding: '0 6px'}}>
      <div id="gymSelectaWrapper" className={css(styles.flex25, styles.scrollBarThinBlack)} style={{overflow: 'auto'}}>
        <div id="gymSelecta" className={css(styles.centerFlexContainer, styles.colNoWrap)}>
          <div style={{height: 40, margin: 12, width: '100%'}}>
            <SearchBar
              customAphrodite={styles.searchBarForm}
              placeholder='Find your spot'
              autoFocus={true}/>
          </div>
          <CitySquares
            dataToFilter={gymInstancesByCity}
            verticalFade={true}/>
        </div>
      </div>

      <div id="gymDetails" className={css(styles.centerFlexContainer, styles.colNoWrap)} style={{flex: '1 1 100%', overflowX: 'hidden'}}>
        {gymDetailsToRender()}
      </div>

      {/** Categories column
        * Insert a MAP here of categories available (from current Cities and Gyms loaded)
            > Use .populate() on the current City to grab all Categories and load
        * Create a small column on right that has logos and small text to rep each catSelecta
        * create an Action that onClick will change STATE and change the visible view of Gyms loaded on left
        */}

      <div id="catSelectaWrapper" className={css(styles.flex15, styles.scrollBarThinBlack)} style={{height: '100%', marginRight: -6, padding: '0 3px 0 10px;', overflow: 'auto'}}>
        <div id="catSelecta" className={css(styles.centerFlexContainer, styles.colNoWrap)} style={{height: '100%', width: '100%'}}>
          {categoriesByCity.map( (cat, index) => {
            return (
              <div className={null} key={index} className={css(index === 0 ? styles.marginTop50 : null, styles.catDivs)} style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', height: '100%', width: '100%'}}>
                <h1 style={{font: '800 italic 110% "Helvetica"'}}>{cat.name.toUpperCase()}</h1>
                <img src={cat.icon} style={{width: 60}}/>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  );
}
/* Categories with CitySquares
<div style={{height: 40, margin: 12, width: '100%'}}>
  <SearchBar
    customAphrodite={styles.searchBarForm}
    placeholder='Choose Category'
    autoFocus={true}/>
</div>
<CitySquares
  dataToFilter={categoriesByCity}
  //useCatDataInput={true}
  verticalFade={true}/>
*/
const styles = StyleSheet.create({
  border: {
    border: '0px solid black'
  },
  fontDef: {
    color: 'ghostwhite',
    font: 'italic bold 250% "Helvetica"',
  },
  flexContainer: {
    display: '-webkit-flex', display: '-moz-flex', display: '-o-flex', display: 'flex',
    //margin: '0 auto',
    position: 'relative'
  },

  inlineFlexContainer: {
    display: '-webkit-inline-flex', display: '-moz-inline-flex', display: '-o-inline-flex', display: 'inline-flex',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden'
  },
  centerFlexContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex10: { flex: '1 1 10%', minHeight: 200, position: 'relative' },
  flex15: { flex: '1 1 15%' },
  flex20: { flex: '1 1 20%' },
  flex25: { flex: '1 1 25%' },
  flex75: { flex: '1 1 75%' },
  flex90: { flex: '1 1 90%' },
  rowWrap: {
    flexFlow: 'row wrap'
  },

  colWrap: {
    flexFlow: 'column wrap'
  },
  colNoWrap: {
    flexFlow: 'column nowrap'
  },
  alignChildrenCenter: {
    alignItems: 'center'
  },

  alignChildrenTop: {
    alignItems: 'flex-start'
  },

  justifyCenter: {
    justifyContent: 'center'
  },

  flex1: {
    flex: '1'
  },
  marginTop50: {
    marginTop: 50
  },
  fullWidthHeight: {
    height: '100%',
    width: '100%'
  },
  fullHeight: {height: '100%', },
  flexItemFullWidth: {
    width: '100%'
  },
  stickRight: {
    marginLeft: 'auto',
  },
  minWidth: {
    minWidth: 500
  },
  searchBarForm: {
    ':focus': {
      border: '6px solid #a7ffd5'
    },
  },
  defaultFont: {
    color: 'black',
    font: 'italic 150% "Helvetica"',
    textAlign: 'center'
  },
  header: {
    textShadow: '0px 0px 8px black'
  },
  blackBG: {
    backgroundColor: 'white',
    padding: '2%',
    textAlign: 'center'
  },
  catSelecta: {
    ':first_child': {
      marginTop: 50,
    }
  },
  catDivs: {
    ':hover': {
      boxShadow: '0px 0px 5px rgba(0,0,0,0.25)',
    },
    ':active': {
      boxShadow: '0px 0px 8px rgba(255,0,0,0.5)',
    },
    cursor: 'pointer',
    minHeight: 110,
    overflow: 'hidden'
  },
  scrollBarThinBlack: {
    '::-webkit-scrollbar': {
      width: 6,
      backgroundColor: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
    },
  }
})

// === Pass STATE from STORE as PROPS
function mapStateToProps (state) {
  return {
    categoriesByCity: state.categories.categories,
    currentCity: state.cities.cities,
    currentFilteredDataArray: state.filteredData.data,
    gymInstancesByCity: state.gymInstances.gymInstancesByCity,
    fetchingCities: state.cities.fetching,
    fetchingCategories: state.categories.fetching,
    fetchingGymInstances: state.gymInstances.fetching,

  }
}
// === Pass ACTION FNS from ACTION MODULE as PROPS
function mapActionCreatorsToProps (dispatch) {
  return bindActionCreators(Actions,dispatch);
}

// === CONNECT component to REACT STORE
export default connect(mapStateToProps, mapActionCreatorsToProps)(GymViewerPage)
