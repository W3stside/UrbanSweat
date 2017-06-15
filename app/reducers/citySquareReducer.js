
const citySquareReducer = (
state = {
  clicked: false,
  id: null
}, action) => {
  switch (action.type) {

    case "CITYSQUARE_CLICK":
      return {
        ...state,
        clicked: action.payload.clickStatus,
        id: action.payload.id
      }

    default: return state;

  }
}

export default citySquareReducer;
