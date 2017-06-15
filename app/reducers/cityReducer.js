const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  cities: [],
}

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CITIES_PENDING":
      return {
        ...state,
        fetching: true
      }
      break;

    case "FETCH_CITIES_ERROR":
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
      break;

    case "FETCH_CITIES_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        cities: action.payload
      }
      break;
    default: return state;
  }
}

export default cityReducer;
