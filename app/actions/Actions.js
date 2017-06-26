
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
    dataInput: input
  }
}

//CitySquare Actions
export function handleCitySquareClick (clickStatus, id) {
  return {
    type: 'CITYSQUARE_CLICK',
    payload: {
      clickStatus: !clickStatus,
      id: id
    }
  }
}

//Misc Click Action
export function handleClick (clickStatus) {
  return {
    type: 'CLICK',
    click: !clickStatus
  }
}

export function handleSlideshowClick(clickStatus) {
  return {
    type: 'CLICK',
    payload: !clickStatus
  }
}
