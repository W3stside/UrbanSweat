//user Reducer

const initialState = {
    redirectURL: '/',

    loggedIn: false, //will depend on cookie and session
    isLoggingIn: false,
    alertMessage: null,

    registering: false,
    registered: false,

    error: null,

    userInfo: {
        first_name: null,
        last_name: null,
        email: null,
        username: null,
        password: null,
        reEnter_password: {
            password: null,
            match: true
        },
        profileImg: require("../assets/logo2.png")
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'START_USER_LOGIN':
            return {
                ...state,
                isLoggingIn: true
            }

        case 'END_USER_LOGIN':
            return {
                ...state,
                isLoggingIn: false,
                loggedIn: true
            }

        case 'BAD_USER_LOGIN':
            return {
                ...state,
                isLoggingIn: false,
                loggedIn: false,
                alertMessage: action.payload
            }

        case 'ERROR_USER_LOGIN':
            return {
                ...state,
                isLoggingIn: false,
                loggedIn: false,
                error: action.payload
            }

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

        case 'BAD_USER_REGISTRATION':
            return {
                ...state,
                registering: false,
                registered: false,
                alertMessage: action.payload
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

        case 'USER_INFO_REENTER_PASSWORD':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    reEnter_password: action.payload === state.userInfo.password && state.userInfo.password.length > 0
                    ? {
                        password: action.payload,
                        match: true
                      }
                    : {
                        password: action.payoad,
                        match: false
                      }
                }
            }

        case 'CLEAR_USER_INFO':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    password: null,
                    reEnter_password: {
                        password: null,
                        match: true
                    },
                }
            }

        case 'SAVE_REDIRECT_URL':
            return {
                ...state,
                redirectURL: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;
