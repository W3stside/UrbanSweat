// ===========================================================
// === Top Level App Component
// ===========================================================

// === REACT
import React, {Component} from 'react'
// === REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'
//Redux-Persist Initial State setter from LocalStorage
import {getStoredState} from 'redux-persist'

// === ROUTER
import {browserHistory} from 'react-router'
// === COMPONENTS
import Home from '../Home'

class App extends Component {
    //Check localStore for User loggedIn status
    componentDidMount() {
        const {dispatch} = this.props;
        // with callbacks
        getStoredState( {}, (err, state) => {
            if(err) throw err;

            if(state.loggedIn) {
                dispatch({
                    type: 'END_USER_LOGIN'
                })
                return;
            }
        })
    }

    componentDidUpdate(prevProps) {
        const {loggedIn, redirectURL} = this.props;

        //Login / Logout
        const isLoggingIn = !prevProps.loggedIn && loggedIn;
        const isLoggingOut = prevProps.loggedIn && !loggedIn;

        //Handle first login
        //if(firstLogIn) browserHistory.push('/')
        //if user logs IN - redirect to last URL
        if (isLoggingIn) {
            if (redirectURL !== "/") {
                browserHistory.push(redirectURL);
                return;
            }
            return;
        };
        //If user logs OUT
        //if (isLoggingOut) browserHistory.push('/');
    }

    render() {
        return this.props.children;
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.users.loggedIn,
        redirectURL: state.users.redirectURL
    }
}

function mapActionCreatorsToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(App);
