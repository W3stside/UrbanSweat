# David's Custom MERN-TDD Build (forked and customized from jpsierens original found [here](https://github.com/jpsierens/webpack-react-redux))
A full boilerplate for playing around with react, redux and react-router with the help of webpack, express, mongoDB + mongoose and full TDD suite.

Contains:

* simple functional component layout - Recompos for HoC layouts.
* ES6 - 7 Support with Babel
* Redux dev tools to help you keep track of the app's state
* Routing
* hot module replacement support so you can change modules or react components without having to reload the browser
* a webpack production config so you can build the app and make it ready for production
* Sass support, just import your styles wherever you need them
* Default styling available in ./styles/default.js
    * allows <code>className="cssClassNameHere justLike normalCSS"</code> - no {} curly braces necessary.
    * added a flex implementation via flexP12 flexP6 etc - refer to default.js for more details
    * disabled by default - remove entirely if needed - sets inline styles at top of index file - only caveat
* eslint to keep your js readable
* much more...

## Run the app

0. ```npm install```
0. ```npm start```

Once running, if you want to hide the redux dev monitor: ```CTRL+H```

Yes, it takes a while to load the first time you open the app.

The app updates without the browser having to reload. You don't lose state!

## Build the app
```npm run build```

This will build the app into the "dist" directory in the root of the project. It contains the index.html along with the minified assets, ready for production.

![](http://i.imgur.com/uUg2A3S.png)

It should look something like the above image.

## Test the app
``npm run test``

This will fire tests from ./test and configure using test-config.js file

> Huge thanks to jpsierens for the original build.
> W3stside Test App - uses React + Redux + Router // Express // Node

# // REFERENCE SHEET + EXAMPLES

> Reference sheet for various parts of a MERN stack project using the tools included in this. 

> You'll also find REAL old project examples of tests and components to see real world cases (included subjectively based on how I learn best).

> TDD uses `chai`, `mocha`, `enzyme`, `sinon`, `redux-mockstore`, and `nock`.

``FRONTEND REDUX``

### ACTIONS - sync & async 
> sync actionCreator for text input using curried 'thunk' format
```javascript
/**
 * Redux actionCreator that fires when handling text inputs (input fields, forms etc)
 * @param  {string} type action type
 * @param  {string} input event.target.value from input nodes//components
 * @return {object}       object with TYPE and PAYLOAD for Reducer to handle
*/
export const handleTextInput = type => field => input => {
    return {
        type,
        payload: {
            input,
            field
        }
    };
};
```
> async actionCreator for HTTP requests
```javascript
/* eslint no-console: 0 */
// axios HTTP requester
import axios from 'axios'
// CONSTANTS
import * as types from './types'

/**
 * aSync is a CURRIED function
 * @param  {object}     type OBJECT with action TYPES e.g type.start = USERS_ASYNC_WORKING from constants
 * @param  {object}     config HTTP config
 * @param  {function}   dispatch dispatch function for firing actions (thunk)
*/
export const aSync = method => (url, data) => dispatch => {
    // Set state to aSyncWorking
    dispatch({
        type: types.USERS_ASYNC_WORKING
    })
    // HTTP verb
    return axios({
        method,
        url,
        data
    })
    // RESPONSE data
    .then(res => dispatch({
        type: types.USERS_ASYNC_DONE,
        payload: res.data
    }))
    // ERROR handling
    .catch(err => dispatch({
        type: types.USERS_ASYNC_ERROR,
        payload: err
    }))
}
```
### CONSTANTS
> Used to replace string based action types to prevent accidents - creates a structured less error prone approach
```javascript
// /////////////
// /// SYNC
// ////////////

// Users
export const USERS_TEXT_INPUT      = 'USERS_TEXT_INPUT'

// //////////////
// /// ASYNC
// /////////////

// Users
export const USERS_ASYNC_WORKING  = 'USERS_ASYNC_WORKING'
export const USERS_ASYNC_DONE     = 'USERS_ASYNC_DONE'
export const USERS_ASYNC_ERROR    = 'USERS_ASYNC_ERROR'

```
### REDUCERS
> Using ES6 computed Object keys in conjunction with actionCreators that accept Object key names as an argument in curryable format (see sync actions)
```javascript
import * as types from '../actions/types';

/**
 * initialState passed to Reducer below
 * @type {Object}
 */
const initialState = {
    // USER DATA
    userData: {
        name: '',
        id: '',
        email: '',
        password: '',
    },
    // ASYNC action states
    aSyncWorking: false,
    aSyncFinished: false,
    // USER AUTH states
    loggedIn: false,
    registered: false,
    fetched: false,
    // DATA
    users: [],
    // ERRORS
    errors: null
};

/**
 * Users Reducer - handles Users slice of State object
 * @param  {object} [state=initialState] initialState - see top
 * @param  {object} action               returned from relevant actionCreator
 * @return {object}                      returns a MERGED (non-mutated) new Store object with NEW STATE
 */
const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.USERS_TEXT_INPUT:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    [action.payload.field]: action.payload.input
                },
            };

        default:
            return state;
    }
};

export default usersReducer;
```

``TESTING``

#### COMPONENTS
```javascript
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import TestComponent from '../../../app/components/TestComponent';

describe('<TestComponent />', () => {
    const wrapper = shallow(<TestComponent />);
    it('it should find 3 div tags', () => {
        expect(wrapper.find('div')).to.have.length(3);
    });
    it('should find 1 a tag', () => {
        expect(wrapper.find('a')).to.have.length(1);
    });
    it('should find 1 h1 tag', () => {
        expect(wrapper.find('h1')).to.have.length(1);
    });
    it('should find 2 Link tags', () => {
        expect(wrapper.find('Link')).to.have.length(2);
    });
});
```

#### SYNC Actions
```javascript
/* eslint no-console: 0 */
// Expect lib
import {expect} from 'chai'
// CONSTANTS & ACTIONS to test with
import * as actions from '../../../app/actions'
import * as t from '../../../app/actions/types'

/** EXAMPLE React Redux Sync Actions Unit Test
 * How to test Action Creators
 */
 
describe('actions', () => {
    it('USERS_TEXT_INPUT action should add Input', () => {
        // Caching actionCreator args
        const type = t.USERS_TEXT_INPUT;
        const input = 'poop';
        const field = 'NAME';
        
        // Custom curried Action
        const UserNameInput = actions.handleTextInput(type)(field);
        
        const expectedAction = {
            type: 'USERS_TEXT_INPUT',
            payload: {
                input: 'poop',
                field: 'NAME',
            }
        };
        
        console.log(UserNameInput(input));
        expect(actions.handleTextInput(type)(field)(input)).to.eql(expectedAction);
    });
});
```
#### ASYNC Actions w/Nock + Axios
> use ``nock()`` like a typical HTTP client to fake HTTP calls on your API endroutes
```javascript
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// For HTTP req
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
// Stub requests
import nock from 'nock';
// Expect lib
import {expect} from 'chai';
// ACTIONS + CONSTANTS to test
import {aSync} from '../../../app/actions/aSyncAction'
import * as types from '../../../app/actions/types'

/** EXAMPLE React Redux aSync Actions Unit Test
 * How to test ASYNC Action Creators
 */

// Axios by default changes http server to xmlhttp so use this to set defaults for axios
axios.defaults.host = apiURL;
axios.defaults.adapter = httpAdapter;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    
    // Cache base API URL
    const apiURL = 'https://jsonplaceholder.typicode.com';
    // Cache test endpoint
    const endpoint = 'posts';
    // Cache variable URL param
    const param = 1;
   
    describe('User related Action Creaors', () => {
    
        //Clean api mocks
        afterEach(() => {
            nock.cleanAll();
        });

        // GET users
        it('fires USERS_ASYNC_WORKING then USERS_ASYNC_DONE when SUCCESS', () => {
        
            //Curried actionCreator
            const userASyncGET = aSync('GET');
            
            //Nock mock api call
            nock(apiURL)
                .get('/posts/1')
                .reply(200, {
                    users: [
                        {
                            email: 'steve@steve.com',
                            name: 'steve',
                            title: 'Dr.'
                        }
                    ]
                });

            //What we expect the action fired to look like
            const expectedActions = [
                { type: types.USERS_ASYNC_WORKING },
                { type: types.USERS_ASYNC_DONE, payload: { users: [{name: 'steve', email: 'steve@steve.com', title: 'Dr.'}] }}
            ];
            
            // Create a mock Redux Store to test
            const store = mockStore({
                // USER DATA
                userData: {
                    name: '',
                    id: '',
                    email: '',
                    password: '',
                },
                // ASYNC action states
                aSyncWorking: false,
                aSyncFinished: false,
                // USER AUTH states
                loggedIn: false,
                registered: false,
                fetched: false,
                // DATA
                users: [],
                // ERRORS
                errors: null
            });
            
            //Start Test - fire curried userSyncGET action
            return store.dispatch(
            userASyncGET(`https://jsonplaceholder.typicode.com/${endpoint}/${param}`))
            .then(() => {
                // return of async actions
                expect(store.getActions()).to.eql(expectedActions);
            })
        });
        
        // USER registration TEST
        it('fires START_USER_REGISTRATION then END_USER_REGISTRATION then CLEAR_USER_INFO when SUCCESS', () => {
            
            //Cache mock data to POST  
            const data = {userID: 20, id: 40, title: 'Hello', body: 'World'};
            
            //Curried POST actionCreator
            const userASyncPOST = aSync('POST');
            
            //nock mock api call
            nock(apiURL)
                .post('/posts', data)
                .reply(201, {
                    post: data
                });

            const expectedActions = [
                { type: types.USERS_ASYNC_WORKING },
                {
                    type: types.USERS_ASYNC_DONE,
                    payload: {
                        post: {
                            body: 'World',
                            id: 40,
                            title: 'Hello',
                            userID: 20
                        }
                    }
                },
            ];
            
            // Create a mock Redux Store to test
            const store = mockStore({
                // USER DATA
                userData: {
                    name: '',
                    id: '',
                    email: '',
                    password: '',
                },
                // ASYNC action states
                aSyncWorking: false,
                aSyncFinished: false,
                // USER AUTH states
                loggedIn: false,
                registered: false,
                fetched: false,
                // DATA
                users: [],
                // ERRORS
                errors: null
            });
            
            //Start test - dispatch curried actionCreator fn
            return store.dispatch(
            userASyncPOST('https://jsonplaceholder.typicode.com/posts', data))
            .then(() => {
                // EXPECTED return of async actions - what TEST is based on
                expect(store.getActions(data)).to.eql(expectedActions);
            });
        });
    });
});
```
#### REDUCERS
> Create fake initialState object and create tests akin to using a real Reducer in the app.
> Look at each ``it()`` block and notice how first we initiate State by passing ``undefined`` then in subsequent blocks
test on the reducer by firing actions and writing test expectations
```javascript
import {expect} from 'chai'
// TEST RELATED IMPORTS
import reducer from '../../../app/reducers/usersReducer'
import * as types from '../../../app/actions/types'

const state = {
    // USER DATA
    userData: {
        name: '',
        id: '',
        email: '',
        password: '',
    },
    // ASYNC action states
    aSyncWorking: false,
    aSyncFinished: false,
    // USER AUTH states
    loggedIn: false,
    registered: false,
    fetched: false,
    // DATA
    users: [],
    // ERRORS
    errors: null
}

// REDUCER SIGNATURE REFRESH
// reducer( initialState, action ) => ...

describe('USERS reducer', () => {

    it('should return the initial state', () => {
        // Pass in undefined when initializing to pass in initialState
        expect( reducer(undefined, {}) ).to.eql(state)
    });

    it('should handle TEXT_INPUT', () => {
        // TEXT_INPUT Test 1
        expect(
            reducer(state, {
                type: types.USERS_TEXT_INPUT,
                payload: {
                    input: 'Steve Irwin',
                    field: 'name'
                }
            })
        ).to.eql({
            ...state,
            userData: {
                email: '',
                id: '',
                name: 'Steve Irwin',
                password: '',
            }
        })
        // TEXT_INPUT Test 2 
        expect( reducer(
            // State
            {
                ...state,
                userData: {
                    email: '',
                    id: '',
                    name: 'Steve Irwin',
                    password: '',
                }
            },
            // Actions
            {
                type: types.USERS_TEXT_INPUT,
                payload: {
                    input: 'hunter12',
                    field: 'password'
                },
            })
        ).to.eql({
            ...state,
            userData: {
                ...state.userData,
                name: 'Steve Irwin',
                password: 'hunter12'
            }
        })
    })
})
```
