import axios from 'axios'

export function fetchGym(city_id = '') {
    return function(dispatch) {
        dispatch({
            type: 'FETCH_GYMS_PENDING'
        })
        axios.get('http://localhost:3007/models/gyms/' + city_id)
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
