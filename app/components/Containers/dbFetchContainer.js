//React imports
import React, {Component} from 'react'
// === REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import actions and create 1 actions object
//import * as cityActions from '../actions/cityActions';

const fetchFromDB = request => WrappedComponent =>
    class extends Component {

        componentDidMount() {
            //Will log this.props
            request(this.props);
        }

        render() {
            return <WrappedComponent {...props}/>
        }
    }

const enhancedFetcher = dbFetchContainer( (props) => { console.log(props) } )

const dbFetchContainer = enhancedFetcher(Component)

export default dbFetchContainer;    
