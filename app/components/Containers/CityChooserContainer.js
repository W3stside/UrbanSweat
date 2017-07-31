//REACT Imports
import React, {Component} from 'react';
// === REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//ACTION CREATORS
import * as Actions from '../../actions/Actions';
import * as cityActions from '../../actions/cityActions';
//RECOMPOSE
import { compose, withProps, lifecycle, withState, withHandlers, pure } from 'recompose';
//COMPONENTS
import CityChooser from '../CityChooser'

const mapStateToProps = (state) => (
    {
        cities: state.cities
    }
)
const mapActionCreatorsToProps = (dispatch) => {
    return {
        Actions: bindActionCreators(Actions, dispatch),
        cityActions: bindActionCreators(cityActions, dispatch)
    }
}

//Compose State and Action creators + lifecycle methods onto CityChooser by WRAPPING it and passing state/props
const enhance =
    compose(
        connect(mapStateToProps, mapActionCreatorsToProps),
        lifecycle({
            componentDidMount() {
                this.props.cityActions.fetchCity()
            },
            componentWillUnmount () {
              //ACTION reset dataInput in form search bar to nothing
              this.props.Actions.handleDataInput('');
            }
        })
    );

const CityChooserContainer = enhance(CityChooser);

export default CityChooserContainer;
