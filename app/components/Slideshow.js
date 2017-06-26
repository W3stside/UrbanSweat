import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/Actions'
import { StyleSheet, css } from 'aphrodite'

export class Slideshow extends Component {

  static propTypes () {
    counter: React.PropTypes.number.isrequired //passed in as STATE from mapStateToProps at bottom -- initialState: 0 -- affected by nextImage and previousImage props
    images: React.PropTypes.array.isrequired //passed in as STATE from mapStateToProps at bottom -- array of all images to iterate and render -- array in reducer
    nextImage: React.PropTypes.function.isrequired //passed in as ACTION from mapActionCreatorsToProps -- state.counter++
    previousImage: React.PropTypes.function.isrequired //passed in as ACTION from mapActionCreatorsToProps -- state.counter--
  }
  handleClick (clickStatus) {
    this.props.handleSlideshowClick(clickStatus);
  }
  render () {
    // ** to eliminate using this.props.whatever each time, map names via below:
    // * aka "this.props.whatever" BECOMES JUST "whatever"
    // * const {images, selectedImage, dispatch} = this.props; //ES5: const images = this.state.images && const currImage = this.state.currImage

    //prop mapped from mapStateToProps at bottom - selectedImage is found in the reducer functions (see notes below)
    //this.props.images comes from mapStateToProps, which maps the state found in ./reducers/reducer.js
    //onClick dispatch an action
    //Dispatches actions Actions.setImage() which is imported at top and also found in ./actions/Actions.js

    return (
        <div
          className={css(this.props.clickStatus ? styles.ssContainerOpen : null, styles.slideshowContainer)}>
          <div className={css(this.props.clickStatus ? styles.ssInnerContainerOpen : styles.flexCenter)}>
            <button
              className={css(styles.ssOpenCloseButton, this.props.clickStatus ? styles.ssOpenButton : styles.ssCloseButton)}
              onClick={() => {this.handleClick(this.props.clickStatus)}}><img src="https://image.flaticon.com/icons/png/128/61/61728.png" className={css(styles.ssButtonIcon)}/></button>
            <button
              className={css(styles.galleryButtons, styles.galleryButtonRight)}
              onClick={ () => {
                this.props.nextImage(this.props.counter, this.props.images)
              }}>
              <span className={css(styles.buttonSpans)}>⥤</span>
            </button>
            <button
              className={css(styles.galleryButtons, styles.galleryButtonLeft)}
              onClick={ () => {
                this.props.previousImage(this.props.counter, this.props.images)
              }}>
              <span className={css(styles.buttonSpans)}>⥢</span>
            </button>

            <img
              src={this.props.images[this.props.counter]}
              className={css(styles.autoImage)} />
          </div>
        </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    images: state.slideShow.images,
    selectedImage: state.slideShow.selectedImage,
    counter: state.slideShow.counter,
    clickStatus: state.slideShow.clickStatus
  }
}

//Turns an object whose values are actions, into an object with the same keys but
//with every action wrapped into a dispatch call so they may be invoked directly.
//mapActionCreatorsToProps called with dispatch function and the action FUNCTION OR action OBJECT to bind
//You're essentially returning this:

//let boundActionCreators = bindActionCreators(GalleryActions, dispatch)
//    console.log(boundActionCreators)
    // {
    //   setImage: Function
    // }

//bind all ACTIONS found in FIRST ARG of bindActionCreators to dispatch -- pass to connect after
function mapActionCreatorsToProps (dispatch) {
  return bindActionCreators(Actions, dispatch);
}

var height = '100%';

const styles = StyleSheet.create({
  ssOpenCloseButton: {
    outline: 'none',
    position: 'absolute',
    bottom: 15, right: 110
  },
  ssButtonIcon: {
    width: 29,
    background: 'transparent',
    padding: '5px 0'
  },
  ssOpenButton: {

  },
  ssCloseButton: {

  },
  ssContainerClosed: {

  },
  ssContainerOpen: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    display: 'flex',
    position: 'fixed',
    top: 0, left: 0,
    zIndex: 9999
  },
  ssInnerContainerOpen: {
    border: '5px solid white',
    height: '80%', width: '80%',
    margin: 'auto',
    overflow: 'hidden',
    position: 'relative'
  },
  slideshowContainer: {
    height: height, width: '100%',
    overflow: "hidden"
  },
  galleryButtons: {
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.49)', color: 'rgba(255,255,255,0.4)',
    border: 'none',
    font: 'bold italic 100% Helvetica',
    height: height,
    outline: 'none !important',
    width: 90
  },
  galleryButtonLeft: {
    left: 0
  },
  galleryButtonRight: {
    right: 0
  },
  buttonSpans: {
    ':hover': {textShadow: '-5px 0px 12px rgba(255,255,255,1)', color: '#b9ffef', fontSize: 80},
    fontSize: 60, fontStyle: 'normal', fontWeight: 100, textShadow: '-5px 0px 12px',

    transition: 'all 0.45s linear',
  },
  flexCenter: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100%',
    position: 'relative'
  },
  autoImage: {
    minWidth: '100%',
    height: 'auto'
  }
})

export default connect(mapStateToProps, mapActionCreatorsToProps)(Slideshow)
