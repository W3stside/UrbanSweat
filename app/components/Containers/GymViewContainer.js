import React, {Component} from 'react'

// === REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as gymInstanceActions from '../../actions/gymInstanceActions'
import * as filteredDataActions from '../../actions/filteredDataActions'
import * as cityActions from '../../actions/cityActions'
import * as categoryActions from '../../actions/categoryActions'
import * as AllActions from '../../actions/Actions'
import * as hamburgerMenuActions from '../../actions/hamburgerMenuActions'

const ActionCreators = {
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
//RECOMPOSE
import { compose, withProps, lifecycle, withState, withHandlers, pure } from 'recompose';
//COMPONENTS
import GymViewerPage from '../GymViewerPage'

const mapStateToProps = (state) => (
    {
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
)
const mapActionCreatorsToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
}

//Compose State and Action creators + lifecycle methods onto CityChooser by WRAPPING it and passing state/props
const enhance =
    compose(
        connect(mapStateToProps, mapActionCreatorsToProps),
        lifecycle({
            componentDidMount() {
                const {fetchCategoriesByCity, fetchCityById, fetchGymInstancesByCity} = this.props;

                let gymInstPromise = Promise.resolve(fetchGymInstancesByCity(this.props.routeParams.id));
                let catsByCityPromise = Promise.resolve(fetchCategoriesByCity(this.props.routeParams.id));
                let cityByIDPromise = Promise.resolve(fetchCityById(this.props.routeParams.id));

                Promise.all([gymInstPromise,catsByCityPromise, cityByIDPromise])
                    .then((resp) => {
                        console.log(`Success: ${resp}`)
                    })
                    .catch(err => {
                        throw err;
                    })
                //this.props.cityActions.fetchCity()
            },
            componentWillUnmount () {
                const {handleDataInput, handleMenuClick} = this.props;
                //ACTION reset dataInput in form search bar to nothing
                handleDataInput('');
                //if burger menu is open, close it
                handleMenuClick(true);
            }
        })
    );

const GymViewContainer = enhance(GymViewerPage);

export default GymViewContainer;
