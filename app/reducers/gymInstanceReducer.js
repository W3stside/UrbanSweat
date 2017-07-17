const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    gymInstances: [],
    gymInstancesByCity: [],
}

const gymInstanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_GYM_INSTANCE_PENDING":
            return {
                ...state,
                fetching: true
            }

        case "FETCH_GYM_INSTANCE_REJECTED":
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        case "FETCH_GYM_INSTANCE_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                gymInstances: action.payload
            }

        case "FETCH_GYM_INSTANCE_BY_CITY_PENDING":
            return {
                ...state,
                fetching: true
            }

        case "FETCH_GYM_INSTANCE_BY_CITY_REJECTED":
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        case "FETCH_GYM_INSTANCE_BY_CITY_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                gymInstancesByCity: action.payload
            }

        case "UPDATE_GYM_INSTANCE_BY_CITY_BY_CAT":
            return {
                ...state,
                gymInstancesByCity: action.payload.clickStatus && state.gymInstancesByCity.length !== 0
                    //FILTER and return NEW ARRAY of any matching GYMINSTANCES according to the CATEGORY ID passed in
                    ?
                    state.gymInstancesByCity.filter(gyms => {
                        return gyms.categories.indexOf(action.payload.id) > -1
                    }).map(cat => {
                        return { ...cat,
                            active: 'ACTIVE'
                        }
                    })

                    //IF array is empty, just return the current state
                    :
                    state.gymInstancesByCity.filter(gyms => {
                        return gyms.categories.indexOf(action.payload.id) === -1
                    })
            }

        default:
            return state;
    }
}

export default gymInstanceReducer;
