
const initialState = {
  data: [],
}

const filteredData = (state = initialState, action) => {
  switch(action.type) {
    case 'FILTERED_DATA_ARRAY':
      return {...state, data: action.payload};

    default: return state;
  }
}

export default filteredData;
