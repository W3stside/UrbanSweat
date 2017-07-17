//menuClick Reducer

const menuClick = (
    state = {
        menuClick: false,
    }, action) => {
    switch (action.type) {

        case 'MENU_CLICK':
            return { ...state,
                menuClick: action.menuClick
            };

        default:
            return state;

    }
}

export default menuClick;
