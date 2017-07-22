import axios from 'axios'
var baseURL;
//Set baseURL based on NODE_ENV
process.env.NODE_ENV !== 'production' ? baseURL = 'http://localhost:3007' : 'https://urbansweat.herokuapp.com';

export function fetchGym(city_id = '') {
    return function(dispatch) {
        dispatch({
            type: 'FETCH_GYMS_PENDING'
        })
        axios.get(`/models/gyms/${city_id}`)
            .then((resp) => {
                dispatch({
                    type: 'FETCH_GYMS_FULFILLED',
                    payload: resp.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'FETCH_GYMS_REJECTED',
                    payload: err,
                });
            })
    }
}
