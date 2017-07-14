import axios from 'axios'

export function fetchCategoriesByCity (id = 'all') {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_CATEGORIES_ARRAY_PENDING',
      payload: true,
    })
    axios.get('http://localhost:3007/models/cities/loadCatsArray/' + id)
      .then( (resp) => {
        setTimeout( () => {
          dispatch({
            type: 'FETCH_CATEGORIES_ARRAY_FULFILLED',
            payload: resp.data,
          })
        }, 1000)
      })
      .catch((err) => {
        dispatch({
          type: 'FETCH_CATEGORIES_ARRAY_REJECTED',
          payload: err,
        });
      })
    }
  }

  export function handleCategoryChoice (cat, catClickStatus) {
    return {
      type: 'ADD_CATEGORY',
      payload: {
        cat,
        catClickStatus
      }
    }
  }
