import axios from 'axios'

export function fetchCity (id = '') {
  return function (dispatch) {
    axios.get('http://localhost:3007/models/cities/' + id)
      .then( (resp) => {
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
