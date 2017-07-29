//React imports
import React, {Component} from 'react'
// === REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import actions and create 1 actions object
//import * as cityActions from '../actions/cityActions';

function CallDatabaseContainer(WrappedComponent, actionCreator) {
    return class extends Component {

        componentDidMount() {
            actionCreator(action);
        }

        render() {
            console.log(actionCreator)
            return <WrappedComponent {...props}/>
        }
    }
}

export default CallDatabaseContainer;
