const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  gymInstances: [],
  gymInstancesByCity: [],
}

const gymInstanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GYM_INSTANCE_PENDING":
      return {
        ...state,
        fetching: true
      }

    case "FETCH_GYM_INSTANCE_REJECTED":
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    case "FETCH_GYM_INSTANCE_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        gymInstances: action.payload
      }

    case "FETCH_GYM_INSTANCE_BY_CITY_PENDING":
      return {
        ...state,
        fetching: true
      }

    case "FETCH_GYM_INSTANCE_BY_CITY_REJECTED":
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    case "FETCH_GYM_INSTANCE_BY_CITY_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        gymInstancesByCity: action.payload
      }

    default: return state;
  }
}

export default gymInstanceReducer;
