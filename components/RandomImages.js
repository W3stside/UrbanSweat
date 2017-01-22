import React, {Component} from 'react'
import $ from 'jquery'

export default class RandomImages extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data: [],
        loading: "Please click on the Random Images button!"
       }
    this.RandomImagesApi = this.RandomImagesApi.bind(this);
  }

  //imgur api function here
  RandomImagesApi() {
    this.setState({loading: 'loading...'})
    var imgurApiLink = "https://api.imgur.com/3/gallery/random/random/1";
    $.getJSON(imgurApiLink).done(data => {
      this.setState({
        data: data.data,
        loading: "Loaded!"
      })
    })
  }

  render() {

    return (
      <div>
        <button onClick={this.RandomImagesApi}> Random Image! </button>
        <br/>
        <span>Count Status: {this.state.loading}</span>
        <br/>
        <ImageGrabber images={this.state.data} />
      </div>
    );
  }
}

function ImageGrabber(props) {
    return (
      <div>
        {props.images.map(function(image) {<img src={image.link}/>})}
      </div>
    );
  }
