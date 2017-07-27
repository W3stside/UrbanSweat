// + Plug in .ENV file for whatever that does. jk i actually know what it does
require('dotenv').config()

import chai, {expect} from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
//Async Requester
import axios from 'axios'

////////////////////////////////////////////////////////
// ======== cityActions + cityState
////////////////////////////////////////////////////////
describe('GET Cities by Category', () => {
    it('It should return a non empty Array', () => {
        let promise = Promise.resolve(axios.get(`http://localhost:3007/models/cities/loadCats/paris`))
            .then( resp => resp.data )
            .catch( err => { throw err });
        return expect(promise).to.eventually.be.an("array").that.is.not.empty;
    })
});

describe('GET 1 City by ID', () => {
    it('It should return a non-empty Object with 1 city', () => {
        let promise = Promise.resolve(axios.get(`http://localhost:3007/models/cities/berlin`))
            .then( resp => resp.data )
            .catch( err => { throw err });
        return expect(promise).to.eventually.be.an("object").that.is.not.empty;
    })
});
////////////////////////////////////////////////////////
// ========== gymInstanceActions
////////////////////////////////////////////////////////
describe('GET ALL gymInstances with Categories', () => {
    it('It should return a non empty Array', () => {
        let promise = Promise.resolve(axios.get(`http://localhost:3007/models/gymInstance/fetchGymAndCategories/all`))
            .then( resp => resp.data )
            .catch( err => { throw err });
        return expect(promise).to.eventually.be.an("array").that.is.not.empty;
    })
});

//test anti case w/that.is.empty - fails on is.empty as expected - GREENLIGHT
describe('GET gymInstances by SPECIFIC City', () => {
    it('It should return a non-empty Array', () => {
        let promise = Promise.resolve(axios.get(`http://localhost:3007/models/gymInstance/fetchGymInstancesByCity/all`))
            .then( resp => resp.data )
            .catch( err => { throw err });
        return expect(promise).to.eventually.be.an("array").that.is.not.empty;
    })
});

////////////////////////////////////////////////////////
// ========== userActions
////////////////////////////////////////////////////////

//GOOD LOGIN
describe('POST TRUE userInfo and Login', () => {
    it('It should return a non-empty Object with a property of "_id" - signifying LOGIN OKAY', () => {
        let dummyUInfo = {
            username: process.env.ADMIN_LOGIN_USERNAME,
            password: process.env.ADMIN_LOGIN_PASSWORD,
        };
        let promise = Promise.resolve(axios.post(`http://localhost:3007/login`, dummyUInfo))
            .then( resp => resp.data )
            .catch( err => { throw err });
        return expect(promise).to.eventually.be.an("object").and.to.have.a.property('_id');
    })
});
//BAD LOGIN
describe('POST FALSE userInfo and Login', () => {
    it('It should return a non-empty Object with an ERROR MESSAGE - signifying LOGIN BAD', () => {
        let dummyUInfo = {
            username: "badUser",
            password: "badPass",
        };
        let promise = Promise.resolve(axios.post(`http://localhost:3007/login`, dummyUInfo))
            .then( resp => resp.data )
            .catch( err => { throw err });
        return expect(promise).to.eventually.be.an("object").and.to.have.a.property('message');
    })
});

//////////////////////////
// === Registration
/////////////////////////

//GOOD REGISTER
// describe('POST PASSING userInfo and REGISTER', () => {
//     it('It should return a non-empty Object with a property of "_id" - signifying LOGIN OKAY', () => {
//         let dummyUInfo = {
//             username: "david_admin",
//             password: "admin",
//         };
//         let promise = Promise.resolve(axios.post(`http://localhost:3007/login`, dummyUInfo))
//             .then( resp => resp.data )
//             .catch( err => { throw err });
//         return expect(promise).to.eventually.be.an("object").and.to.have.a.property('_id')
//     })
// });