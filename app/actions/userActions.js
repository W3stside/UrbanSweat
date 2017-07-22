import axios from 'axios'

export function loginUser(userLoginData) {
    return function (dispatch) {
        //#STEP 1: Dispatch when user clicks to start async add to db - this triggers TRUE and brings in async loader
        dispatch({
            type: 'START_USER_LOGIN',
        });
        //#STEP 2: Async post to the backend
        axios.post(`${__dirname}/login`, userLoginData)
            //#STEP 3a: Wait for response back from Express - if bueno THEN fire End User Registration and stop async load
            .then(resp => {
                //if SUCCESSFUL login...
                if (resp.data._id) {
                    dispatch({
                        type: 'END_USER_LOGIN',
                    })
                } else if (!resp.data._id) {

                    dispatch({
                        type: 'BAD_USER_LOGIN',
                        payload: resp.data.message
                    })
                }
            })
            .then( () => {
                dispatch({
                    type: 'CLEAR_USER_INFO'
                })
            })
            //#STEP 3b: IF ERROR, end gif and post error... lay down and cry.
            .catch(error => {
                dispatch({
                    type: 'ERROR_USER_LOGIN',
                    payload: error
                })
            })
    }
}

export function addUser(userData) {
    return function(dispatch) {
        //#STEP 1: Dispatch when user clicks to start async add to db - this triggers TRUE and brings in async loader
        dispatch({
            type: 'START_USER_REGISTRATION',
        });
        //#STEP 2: Async post to the backend
        axios.post(`${__dirname}/register`, userData)
            //#STEP 4: Stop async load gif and CLEAR userInfo state
            .then(resp => {
                dispatch({
                    type: 'CLEAR_USER_INFO'
                })
            })
            //#STEP 3a: Wait for response back from Express - if bueno THEN fire End User Registration and stop async load
            .then(resp => {
                dispatch({
                    type: 'END_USER_REGISTRATION',
                })
            })
            //#STEP 3b: IF ERROR, end gif and post error
            .catch(error => {
                dispatch({
                    type: 'ERROR_USER_REGISTRATION',
                    payload: error
                })
            })
    }
}

export function addFirstName(input) {
    return {
        type: 'USER_INFO_FIRST_NAME',
        payload: input
    }
}

export function addLastName(input) {
    return {
        type: 'USER_INFO_LAST_NAME',
        payload: input
    }
}

export function addEmail(input) {
    return {
        type: 'USER_INFO_EMAIL',
        payload: input
    }
}

export function addUsername(input) {
    return {
        type: 'USER_INFO_USERNAME',
        payload: input
    }
}

export function addPassword(input) {
    return {
        type: 'USER_INFO_PASSWORD',
        payload: input
    }
}

export function addReEnterPassword(input) {
    return {
        type: 'USER_INFO_REENTER_PASSWORD',
        payload: input
    }
}

export function saveRedirectURL(URL) {
    return {
        type: 'SAVE_REDIRECT_URL',
        payload: URL
    }
}
