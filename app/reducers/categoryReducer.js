const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  categories: [],
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_ARRAY_PENDING":
      return {
        ...state,
        fetching: action.payload
      }

    case "FETCH_CATEGORIES_ARRAY_REJECTED":
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    case "FETCH_CATEGORIES_ARRAY_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        categories: action.payload
      }

    default: return state;
  }
}

export default categoryReducer;
