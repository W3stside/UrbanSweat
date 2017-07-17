const initialState = {
    dataInput: '',
    catDataInput: 'all',
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'DATA_INPUT':
            return {
                ...state,
                dataInput: action.dataInput
            }
        case 'CATEGORY_DATA_INPUT':
            return {
                ...state,
                catDataInput: action.dataInput,
            }
        default:
            return state;
    }
}
