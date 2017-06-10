import axios from 'axios';
//Actions listStyle

//GymViewerPage actions
export function setImage (image) {
  return {
    type: 'IMAGE_SELECTED',
    image
  }
}

export function nextImage (currCounter, arr) {
  return {
    type: 'NEXT_IMAGE',
    counter: currCounter < (arr.length - 1) ? currCounter + 1 : 0
  }
}

export function previousImage (currCounter, arr) {
  return {
    type: 'PREVIOUS_IMAGE',
    counter: currCounter > 0 ? currCounter  - 1 : (arr.length - 1)
  }
}

//Hamburger Menu Actions
export function handleMouseOver () {
  return {
    type: 'ON_MOUSE_HOVER',
    hover: true
  }
}

export function handleMouseLeave () {
  return {
    type: 'OFF_MOUSE_HOVER',
    hover: false
  }
}

export function handleMenuClick (clickStatus) {
  return {
    type: 'MENU_CLICK',
    menuClick: !clickStatus
  }
}

//SearchBar Action
export function handleDataInput (input) {
  return {
    type: 'DATA_INPUT',
    dataInput: input.target.value
  }
}

//Misc Click Action
export function handleClick (clickStatus) {
  return {
    type: 'CLICK',
    click: !clickStatus
  }
}

///////////////////////////////////////////////
//// ASYNC ACTIONs
//////////////////////////////////////////////

export function fetchCity (id = '') {
  return function (dispatch) {
    axios.get('http://localhost:3007/models/cities/' + id)
      .then( (resp) => {
        dispatch({
          type: 'FULFILLED',
          payload: resp,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'REJECTED',
          payload: err,
        });
      })
    }
}

export function fetchCategory (id = '') {
  return function (dispatch) {
    axios.get('http://localhost:3007/models/categories/' + id)
      .then( (resp) => {
        dispatch({
          type: 'FULFILLED',
          payload: resp,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'REJECTED',
          payload: err,
        });
      })
    }
}

export function getchGym (id = '') {
  return function (dispatch) {
    axios.get('http://localhost:3007/models/gym/' + id)
      .then( (resp) => {
        dispatch({
          type: 'FULFILLED',
          payload: resp,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'REJECTED',
          payload: err,
        });
      })
  }
}
