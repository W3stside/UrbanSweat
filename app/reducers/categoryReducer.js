const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  categories: [],
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_PENDING":
      return {
        ...state,
        fetching: true
      }
      break;

    case "FETCH_CATEGORIES_ERROR":
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
      break;

    case "FETCH_CATEGORIES_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        categories: action.payload
      }
      break;
    default: return state;
  }
}

export default categoryReducer;
