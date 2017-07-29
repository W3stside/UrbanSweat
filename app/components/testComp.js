//React imports
import React, {Component} from 'react'
import CallDatabaseContainer from './Containers/CallDatabaseContainer'
import CityChooser from './CityChooser'

// === ACTION CREATORS
import * as cityActions from '../actions/cityActions'

const testComp = CallDatabaseContainer(CityChooser, (cityActions) => cityActions.fetchCity());

export default testComp;
