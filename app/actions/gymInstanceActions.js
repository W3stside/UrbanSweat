import axios from 'axios'
var baseURL;
//Set baseURL based on NODE_ENV
process.env.NODE_ENV !== 'production' ? baseURL = 'http://localhost:3007' : 'https://urbansweat.herokuapp.com';

export function fetchGymInstance(id = 'all') {
    return function(dispatch) {
        dispatch({
            type: 'FETCH_GYM_INSTANCE_PENDING'
        })
        axios.get(`${baseURL}/models/gymInstance/fetchGymAndCategories/${id}`)
            .then((resp) => {
                dispatch({
                    type: 'FETCH_GYM_INSTANCE_FULFILLED',
                    payload: resp.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'FETCH_GYM_INSTANCE_REJECTED',
                    payload: err,
                });
            })
    }
}

export function fetchGymInstancesByCity(id = 'all') {
    return function(dispatch) {
        dispatch({
            type: 'FETCH_GYM_INSTANCE_BY_CITY_PENDING'
        })
        axios.get(`${baseURL}/models/gymInstance/fetchGymInstancesByCity/${id}`)
            .then((resp) => {
                dispatch({
                    type: 'FETCH_GYM_INSTANCE_BY_CITY_FULFILLED',
                    payload: resp.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'FETCH_GYM_INSTANCE_BY_CITY_REJECTED',
                    payload: err,
                });
            })
    }
}

export function updateGymInstanceByCityByCat(id, clickStatus) {
    return {
        type: 'UPDATE_GYM_INSTANCE_BY_CITY_BY_CAT',
        payload: {
            id,
            clickStatus: !clickStatus
        }
    }
}
