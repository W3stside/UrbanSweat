import {Gyms} from '../data/gyms/gym'

const initialState = {
    images: Gyms[0].cities[0].categories[0].gyms[0].description.image_urls,
    selectedImage: "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg",
    counter: 3,
    hover: false,
    menuClick: false,
    click: false,
    dataInput: 'all'
}

export default function images(state = initialState, action) {
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

        case 'ON_MOUSE_HOVER':
            return { ...state,
                hover: action.hover
            }

        case 'OFF_MOUSE_HOVER':
            return { ...state,
                hover: action.hover
            }

        case 'MENU_CLICK':
            return { ...state,
                menuClick: action.menuClick
            }

        case 'DATA_INPUT':
            return { ...state,
                dataInput: action.dataInput
            }

        case 'CLICK':
            return { ...state,
                click: action.click
            }

        default:
            return state;
    }
}
