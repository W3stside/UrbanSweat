const initialState = {
    categoriesSelected: [],
    catClickStatus: false,
    fetching: false,
    fetched: false,
    error: null,
    categories: [],
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES_ARRAY_PENDING":
            return {
                ...state,
                fetching: action.payload
            }

        case "FETCH_CATEGORIES_ARRAY_REJECTED":
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        case "FETCH_CATEGORIES_ARRAY_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                categories: action.payload
            }

        case "ADD_CATEGORY":
            return {
                ...state,
                catClickStatus: action.payload.catClickStatus,
                categoriesSelected:
                    (function(cat) {
                        if (state.categoriesSelected.indexOf(cat) === -1) {
                            //IF category is NOT already clicked, add it to active CAT array
                            return [...state.categoriesSelected, cat];

                        } else if (state.categoriesSelected.length !== 0 && state.categoriesSelected.indexOf(cat) > -1) {
                            //ELSE
                            let idxToDel = state.categoriesSelected.findIndex(item => item._id === cat._id);
                            return [...state.categoriesSelected.slice(0, idxToDel), ...state.categoriesSelected.slice(idxToDel + 1)];

                        } else {

                            return [...state.categoriesSelected];
                        }
                    })(action.payload.cat) //end furst fn
            }

        case 'RESET_CATEGORIES':
                return {
                    ...state,
                    categoriesSelected: []
                }

        default:
            return state;
    }
}

export default categoryReducer;
