// + Plug in .ENV file for those super secrets ψ(｀∇´)ψ
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
describe.skip('POST TRUE userInfo and Login', () => {
    it('It should return a non-empty Object with a property of "_id" - signifying LOGIN OKAY', () => {
        let dummyUInfo = {
            username: process.env.ADMIN_LOGIN_USERNAME,
            password: process.env.ADMIN_LOGIN_PASSWORD,
        };
        let promise = Promise.resolve(axios.post(`http://localhost:3007/users/login`, dummyUInfo))
            .then( resp => resp.data )
            .catch( err => { throw err });
        return expect(promise).to.eventually.be.an("object").and.to.have.a.property('_id');
    })
});
//BAD LOGIN
describe.skip('POST FALSE userInfo and Login', () => {
    it('It should return a non-empty Object with an ERROR MESSAGE - signifying LOGIN BAD', () => {
        let dummyUInfo = {
            username: "badUser",
            password: "badPass",
        };
        let promise = Promise.resolve(axios.post(`http://localhost:3007/users/login`, dummyUInfo))
            .then( resp => resp.data )
            .catch( err => { throw err });
        return expect(promise).to.eventually.be.an("object").and.to.have.a.property('message');
    })
});

//////////////////////////
// === Registration
/////////////////////////
//var User = require('../../app/models/usersModel');
//GOOD REGISTER
describe.skip('DELETE User before trying to add', () => {

    before(function(done) {
        axios.delete("http://localhost:3007/users/free@willy.com")
            .then( resp => done() )
            .catch( err => { throw err })
    });

    describe('POST PASSING userInfo and REGISTER', () => {
        it('It should return a non-empty Object with a property of "_id" - signifying REGISTER OKAY', () => {
            let dummyUInfo = {
                first_name: "Willy",
                last_name: "Free",
                email: "free@willy.com",
                username: "FreeWilly",
                password: "free"
            };
            let promise = Promise.resolve(axios.post(`http://localhost:3007/users/register`, dummyUInfo))
                .then( resp => {
                    return resp.data;
                })
                .catch( err => { throw err });
            return expect(promise).to.eventually.be.an("object").and.to.have.a.property('_id');
        })
    });
});

// == Gym async
describe('GET all Categories by City ID', () => {
    it('It should return a non-empty Array', () => {

        let promise = Promise.resolve(axios.get(`http://localhost:3007/models/cities/loadCatsArray/paris`))
            .then( resp => resp.data )
            .catch( err => { throw err });
        return expect(promise).to.eventually.be.an("array");
    })
});
