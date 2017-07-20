//Container for UnMounting UI
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
//Redux Connection
import { connect } from 'react-redux'
//Bring in Actions
import * as hamburgerMenuActions from '../../actions/hamburgerMenuActions'

class UIUnmounter extends Component {

    componentWillUnmount() {
        const {dispatch} = this.props;

        //Close burger menu
        dispatch({
            type: 'MENU_CLICK',
            menuClick: false
        });
    }

    render() {
        return (this.props.children ? this.props.children : null);
    }
}

function mapStateToProps (state) {
    return {
        ...state
    }
}



export default connect(mapStateToProps)(UIUnmounter)
