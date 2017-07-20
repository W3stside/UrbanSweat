//React imports
import React, {Component, PropTypes} from 'react'

//Components
import RouteTransition from '../Containers/RouteTransition'
import Profile from './Profile'

export default class ProfileContainer extends Component {
    render() {
        const {children} = this.props;
        return children;
    }
}
