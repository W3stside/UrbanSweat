const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  gyms: [],
}

const gymsReducer = (state = initialState, action) => {
  switch (action.type) {

    case "FETCH_GYMS_PENDING":
      return {
        ...state,
        fetching: true
      }
      break;

    case "FETCH_GYMS_REJECTED":
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
      break;

    case "FETCH_GYMS_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        gyms: action.payload
      }
      break;

    default: return state;

  }
}

export default gymsReducer;
