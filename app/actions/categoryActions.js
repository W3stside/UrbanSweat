import axios from 'axios'
var baseURL;
//Set baseURL based on NODE_ENV
process.env.NODE_ENV !== 'production' ? baseURL = 'http://localhost:3007' : 'https://urbansweat.herokuapp.com';

export function fetchCategoriesByCity(id = 'all') {
    return function(dispatch) {
        dispatch({
            type: 'FETCH_CATEGORIES_ARRAY_PENDING',
            payload: true,
        })
        axios.get(`${baseURL}/models/cities/loadCatsArray/${id}` )
            .then((resp) => {
                setTimeout(() => {
                    dispatch({
                        type: 'FETCH_CATEGORIES_ARRAY_FULFILLED',
                        payload: resp.data,
                    })
                }, 2000)
            })
            .catch((err) => {
                dispatch({
                    type: 'FETCH_CATEGORIES_ARRAY_REJECTED',
                    payload: err,
                });
            })
    }
}

export function handleCategoryChoice(cat) {
    return {
        type: 'ADD_CATEGORY',
        payload: {
            cat
        }
    }
}

export function resetCategories() {
    return {
        type: 'RESET_CATEGORIES'
    }
}
