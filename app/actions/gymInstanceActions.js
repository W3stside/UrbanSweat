import axios from 'axios'

export function fetchGymInstance (id = 'all') {
  return function (dispatch) {
    dispatch({type: 'FETCH_GYM_INSTANCE_PENDING'})
    axios.get('http://localhost:3007/models/gymInstance/fetchGymAndCategories/' + id)
      .then( (resp) => {
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

export function fetchGymInstancesByCity (id = 'all') {
  return function (dispatch) {
    dispatch({type: 'FETCH_GYM_INSTANCE_BY_CITY_PENDING'})
    axios.get('http://localhost:3007/models/gymInstance/fetchGymInstancesByCity/' + id)
         .then( (resp) => {
           dispatch({
             type: 'FETCH_GYM_INSTANCE_BY_CITY_FULFILLED',
             payload: resp.data,
           });
         })
         .catch ( (err) => {
           dispatch({
             type: 'FETCH_GYM_INSTANCE_BY_CITY_REJECTED',
             payload: err,
           });
         })
    }
  }
