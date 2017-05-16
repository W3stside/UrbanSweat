
import {Gyms} from '../data/gyms/gym'

const initialState = {
  /*images: [
    "https://upload.wikimedia.org/wikipedia/commons/6/6c/Herjangsfjorden_%26_Ofotfjorden%2C_wide%2C_2009_09.jpg",
    "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
    "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg",
    "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg",
    "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
  ],*/
  images: Gyms[0].cities[0].categories[0].gyms[0].description.image_urls,
  selectedImage: "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg",
  counter: 3,
  hover: false,
  click: false,
  dataInput: 'Paris'
}

export default function images (state = initialState, action) {
    switch(action.type) {
      case 'IMAGE_SELECTED':
        return {...state, selectedImage: action.image};

      case 'NEXT_IMAGE':
        return {...state, counter: action.counter}

      case 'PREVIOUS_IMAGE':
        return {...state, counter: action.counter}

      case 'ON_MOUSE_HOVER':
        return {...state, hover: action.hover}

      case 'OFF_MOUSE_HOVER':
          return {...state, hover: action.hover}
      case 'CLICK':
          return {...state, click: action.click}
      case 'DATA_INPUT':
            return {...state, dataInput: action.dataInput}
      default:
        return state;
    }
}
