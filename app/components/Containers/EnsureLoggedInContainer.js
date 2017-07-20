// ====================================================================================
// === React Router Container that takes state and checks if USER is LOGGEDIN or nothing
// ====================================================================================

// === REACT
import React, {Component} from 'react'
// === REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'

// === ROUTER
import {browserHistory} from 'react-router'

class EnsureLoggedInContainer extends Component {

    componentDidMount() {
        const {children, location, loggedIn, saveRedirectURL} = this.props;

        //User not loggedIn? Send that peasant to the login page ;) /s
        if(!loggedIn) {
            //fire userAction that saves current URL for redirection AFTER login
            saveRedirectURL(location.pathname)
            //Redirect user back to login ...or whatever page, really.
            browserHistory.push('/login')
        }
    }

    render() {
        const {children, loggedIn} = this.props;

        //Check if user is loggedIn - IF so, render children ELSE do nothing
        if(loggedIn) {
            return children;
        } else {
            return null;
        }
    }
}

//pass state as props
function mapStateToProps(state) {
    return {
        loggedIn: state.users.loggedIn
    }
}

//pass actions as props
function mapActionCreatorsToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

//connect to store
export default connect(mapStateToProps, mapActionCreatorsToProps)(EnsureLoggedInContainer);
