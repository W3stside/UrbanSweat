import axios from 'axios'
var baseURL;
//Set baseURL based on NODE_ENV
process.env.NODE_ENV !== 'production' ? baseURL = 'http://localhost:3007' : 'https://urbansweat.herokuapp.com';

export function fetchCity(id = 'all') {
    return function(dispatch) {
        dispatch({
            type: 'FETCH_CITIES_PENDING'
        })
        axios.get(`${baseURL}/models/cities/loadCats/${id}`)
            .then((resp) => {
                setTimeout(() => {
                    dispatch({
                        type: 'FETCH_CITIES_FULFILLED',
                        payload: resp.data,
                    })
                }, 1000);
            })
            .catch((err) => {
                dispatch({
                    type: 'FETCH_CITIES_REJECTED',
                    payload: err,
                });
            })
    }
}

export function fetchCityById(id = 'all') {
    return function(dispatch) {
        axios.get(`${baseURL}/models/cities/${id}`)
            .then((resp) => {
                dispatch({
                    type: 'FETCH_CITIES_FULFILLED',
                    payload: resp.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'FETCH_CITIES_REJECTED',
                    payload: err,
                });
            })
    }
}

export function resetCity() {
    return {
        type: 'FETCH_CITIES_RESET'
    }
}
