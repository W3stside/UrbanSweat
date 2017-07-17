import {Gyms} from '../data/gyms/gym'

const initialState = {
    images: Gyms[0].cities[0].categories[0].gyms[0].description.image_urls,
    selectedImage: "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg",
    counter: 3,
    clickStatus: false,
}

const slideshow = (state = initialState, action) => {
    switch (action.type) {
        case 'IMAGE_SELECTED':
            return { ...state,
                selectedImage: action.image
            };

        case 'NEXT_IMAGE':
            return { ...state,
                counter: action.counter
            }

        case 'PREVIOUS_IMAGE':
            return { ...state,
                counter: action.counter
            }
        case 'CLICK':
            return { ...state,
                clickStatus: action.payload
            }
        default:
            return state;
    }
}

export default slideshow;
