import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { StyleSheet, css } from 'aphrodite';
import * as GalleryActions from '../actions/galleryActions'

const styles = StyleSheet.create({
  galleryButtons: {
    position: 'absolute',
    background: 'rgba(0,0,0,0.4)', color: 'white',
    border: 'none',
    font: 'bold 140% "Marker", Helvetica',
    height: '280px',
    textDecoration: 'none'
  },
  galleryButtonLeft: {
    left: 0
  },
  galleryButtonRight: {
    right: 0
  }
})

export class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes () {
    selectedImage: React.PropTypes.string.isrequired //passed in as STATE from mapStateToProps at bottom
    images: React.PropTypes.array.isrequired //passed in as STATE from mapStateToProps at bottom
    setImage: React.PropTypes.function.isrequired //passed in as ACTION from mapActionCreatorsToProps
  }

  render () {
    // ** to eliminate using this.props.whatever each time, map names via below:
    // * aka "this.props.whatever" BECOMES JUST "whatever"
    // * const {images, selectedImage, dispatch} = this.props; //ES5: const images = this.state.images && const currImage = this.state.currImage

    //prop mapped from mapStateToProps at bottom - selectedImage is found in the reducer functions (see notes below)
    //this.props.images comes from mapStateToProps, which maps the state found in ./reducers/reducer.js
    //onClick dispatch an action
    //Dispatches actions GalleryActions.setImage() which is imported at top and also found in ./actions/galleryActions.js

    return (
      <div className="image-gallery">
        <div className="gallery-image" style={{overflow: "hidden", height: "280px"}}>
          <div>
          <button
            className={css(styles.galleryButtons, styles.galleryButtonRight)}
            onClick={ () => {
              this.props.nextImage(this.props.counter, this.props.images)
            }}>Next</button>
          <button
            className={css(styles.galleryButtons, styles.galleryButtonLeft)}
            onClick={ () => {
              this.props.previousImage(this.props.counter, this.props.images)
            }}>Prev</button>

            <img
              src={this.props.images[this.props.counter]}
              style={{minWidth: "100%"}} />
          </div>
        </div>
        IMAGE REST
        <div className="image-scroller" style={{display: "flex", flexFlow: "row wrap", justifyContent: "space-around"}}>
          {this.props.images.map((image, index) => (
            <div
              key={index}
              onClick={()=> {
                this.props.setImage(image)
              }}
              style={{overflow: "hidden", height: "280px"}}>
              <img src={image}/>
            </div>
          ))}
        </div>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    images: state.images,
    selectedImage: state.selectedImage,
    counter: state.counter
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

function mapActionCreatorsToProps (dispatch) {
  return bindActionCreators(GalleryActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)
