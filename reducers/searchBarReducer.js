const initialState = {
  dataInput: 'all'
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'DATA_INPUT':
      return {
        ...state,
        dataInput: action.dataInput
      }

    default: return state;
  }
}
