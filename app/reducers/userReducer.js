//user Reducer

const initialState = {
    registering: false,
    registered: false,
    error: null,

    userInfo: {
        first_name: null,
        last_name: null,
        email: null,
        username: null,
        password: null
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_USER_REGISTRATION':
            return {
                ...state,
                registering: true
            }

        case 'END_USER_REGISTRATION':
            return {
                ...state,
                registering: false,
                registered: true
            }
        case 'ERROR_USER_REGISTRATION':
            return {
                ...state,
                registering: false,
                registered: false,
                error: action.payload
            }

        case 'USER_INFO_FIRST_NAME':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    first_name: action.payload
                }
            }

        case 'USER_INFO_LAST_NAME':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    last_name: action.payload
                }
            }

        case 'USER_INFO_EMAIL':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    email: action.payload
                }
            }

        case 'USER_INFO_USERNAME':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    username: action.payload
                }
            }

        case 'USER_INFO_PASSWORD':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    password: action.payload
                }
            }

        case 'CLEAR_USER_INFO':
            return {
                ...state,
                userInfo: {
                    first_name: null,
                    last_name: null,
                    email: null,
                    username: null,
                    password: null
                }
            }

        default:
            return state;
    }
}

export default userReducer;
