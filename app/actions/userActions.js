import axios from 'axios'

export function addUser(userData) {
    return function(dispatch) {
        //#STEP 1: Dispatch when user clicks to start async add to db - this triggers TRUE and brings in async loader
        dispatch({
            type: 'START_USER_REGISTRATION',
        });
        //#STEP 2: Async post to the backend
        axios.post('http://localhost:3007/registration/register', userData)
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
