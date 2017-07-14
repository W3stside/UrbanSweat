
const initialState = {
  data: [],
}

const filteredData = (state = initialState, action) => {
  switch(action.type) {
    case 'FILTERED_DATA_ARRAY':
      return {...state, data: action.payload};

    case "UPDATE_FILTERED_ARR_BY_CAT":
      return {
        ...state,
        data:
          action.payload.clickStatus && state.data.length !== 0
          //FILTER and return NEW ARRAY of any matching GYMINSTANCES according to the CATEGORY ID passed in
          ? state.data.filter( data => {
            return data.data.categories.indexOf(action.payload.id) > -1
          } )
          //IF array is empty, just return the current state
          : [...state.data]
      }

    default: return state;
  }
}

export default filteredData;
