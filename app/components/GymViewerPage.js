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
    resetCategories: categoryActions.resetCategories,
    handleMenuClick: hamburgerMenuActions.handleMenuClick,
    updateFilteredArrByCat: filteredDataActions.updateFilteredArrByCat,
    updateGymInstanceByCityByCat: gymInstanceActions.updateGymInstanceByCityByCat
}
// === COMPONENTS
import BackgroundPic from './BackgroundPic'
import CategorySelector from './CategorySelector'
import GymContent from './GymLowerHalfContent'
import HamburgerMenu from './HamburgerMenu'
import Logo from './Logo'
import LoadingGif from './LoadingGif'

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

componentWillUnmount() {
    //reset dataInput in form search bar to nothing
    this.props.handleDataInput('');
    //if burger menu is open, close it
    this.props.handleMenuClick(true);
}

  render () {
    const {categoriesByCity, catDataInput, catClickStatus, categoriesSelected, resetCategories, currentFilteredDataArray, gymInstancesByCity, fetchingCities, fetchingCategories, fetchingGymInstances, handleCategoryChoice} = this.props;
    //ASync conditional - if currently fetching data, render spinner
    if (fetchingCategories || fetchingCities) {
      return <LoadingGif />
    }
    //Main content
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
            resetCategories={resetCategories}
            categoriesByCity={categoriesByCity}
            catClickStatus={catClickStatus}
            handleCategoryChoice={this.props.handleCategoryChoice}
            updateFilteredArrByCat={this.props.updateFilteredArrByCat}
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

// === Pass STATE from STORE as PROPS
function mapStateToProps(state) {
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
function mapActionCreatorsToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// === CONNECT component to REACT STORE
export default connect(mapStateToProps, mapActionCreatorsToProps)(GymViewerPage)
