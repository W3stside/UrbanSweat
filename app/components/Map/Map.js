// === REACT
import React, {Component} from 'react'
// === REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// === RECOMPOSE
import { compose, withProps, lifecycle, withState, withHandlers, pure } from 'recompose';
// === GOOGLE MAPS
import GoogleMap from 'google-map-react'

const GoogleMapContainer = (props) => {
    return <GoogleMap
            apiKey={props.apiKey}
            center={props.center}
            zoom={props.zoom}
            style={{height: '100vh'}}
            />
}

export default compose(
    withProps({
        apiKey: process.env.GOOGLE_API_KEY, //default and should be in .env
        center: [52.5200, 13.4050], //this will come from state or props from a higher level component
        zoom: 10 //set as default
    })
)(GoogleMapContainer);
