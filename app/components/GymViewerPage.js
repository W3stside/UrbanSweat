import React, {Component} from 'react'

// === REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as gymInstanceActions from '../actions/gymInstanceActions'
import * as filteredDataActions from '../actions/filteredDataActions'
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
  handleCategoryChoice: categoryActions.handleCategoryChoice,
  handleMenuClick: hamburgerMenuActions.handleMenuClick,

  updateGymInstanceByCityByCat: gymInstanceActions.updateGymInstanceByCityByCat
}
// === COMPONENTS
import BackgroundPic from './BackgroundPic'
import CategorySelector from './CategorySelector'
import GymContent from './GymLowerHalfContent'
import HamburgerMenu from './HamburgerMenu'
import Logo from './Logo'

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
    const {categoriesByCity, catDataInput, catClickStatus, categoriesSelected, currentFilteredDataArray, gymInstancesByCity, fetchingCities, fetchingCategories, fetchingGymInstances, handleCategoryChoice} = this.props;
    //ASync conditional - if currently fetching data, render spinner
    if (fetchingCategories) {
      return (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%'}}>
          <img src="http://31.media.tumblr.com/0c855ac97b211311541a2fad6b3042be/tumblr_nfi14mS6qx1stn28do1_1280.gif" style={{height: '100%', width: '100%'}}/>
        </div>
    )}
    return (
      <div className="flex colNoWrap fullWidthHeight">
          {/*Top 100% section*/}
          <div className="flex rowNoWrap aStart jCenter mdP2 fullWidthHeight overflowHidden" style={{position: 'relative'}}>
                <HamburgerMenu />
                <BackgroundPic image={this.props.currentCity.bgImageURL}/>
                <div className="flex rowNoWrap jCenter aCenter height100">
                  <Logo styleLogo={{maxWidth: '30vh'}}/>
                  <h1 style={{font: 'bold italic 320% "Helvetica"', color: 'white', marginLeft: -40}}> x {this.props.routeParams.id.toUpperCase()} </h1>
                </div>
          </div >

          {/*CatSelecta Column/Row*/}
          <CategorySelector
            categoriesSelected={categoriesSelected}
            categoriesByCity={categoriesByCity}
            catClickStatus={catClickStatus}
            handleCategoryChoice={this.props.handleCategoryChoice}
            //updateFilteredArrByCat={this.props.updateFilteredArrByCat}
            updateGymInstanceByCityByCat={this.props.updateGymInstanceByCityByCat}
            />

          {/*Bottom 100% section*/}
          <GymContent
            currentFilteredDataArray={currentFilteredDataArray}
            catDataInput={catDataInput}
            handleCategoryChoice={handleCategoryChoice}
            gymInstancesByCity={gymInstancesByCity}
            />
      </div> //end main div
    );
  }
}

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
    minHeight: 120, maxHeight: 120,
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
    catClickStatus: state.categories.catClickStatus,
    categoriesSelected: state.categories.categoriesSelected,
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
