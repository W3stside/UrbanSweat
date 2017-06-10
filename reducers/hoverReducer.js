
const hoverReducer = (state = false, action) => {
    switch(action.type) {

      case 'ON_MOUSE_HOVER':
        return state = action.hover;

      case 'OFF_MOUSE_HOVER':
        return state = action.hover;

      default: return state;
    }
}

export default hoverReducer;
