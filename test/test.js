// Automated testing for HAPI REST APIs using Lab test framework
'use strict';

const Lab = require('lab');           // load Lab module
const lab = exports.lab = Lab.script(); //export test script
const Code = require('code');		 //assertion library
//
// Use mocha-like BDD syntax
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('math', () => {

    it('returns true when 1 + 1 equals 2', (done) => {

        expect(1 + 1).to.equal(2);
        done();
    });
});

const Server = require('../server.js');
describe('Basic HTTP Tests', () => {

    it('GET api/property (endpoint test)', { timeout: 5000 }, (done) => {

        const options = {
            method: 'GET',
            url: '/api/property'
        };
        // server.inject lets you simulate an http request
        Server.inject(options, (response) => {
            //  Expect http response status code to be 200 ("Ok")
            expect(response.statusCode).to.equal(200);
            expect(response.result.message).to.equal('Property Data Successfully Fetched');
            expect(response.result.data [0].price).to.equal(150);
            //done ();
            Server.stop(done);  // done() callback is required to end the test.
        });
    });

    it('POST api/property (endpoint test)', (done) => {

        const options = {
            method: 'POST',
            url: '/api/property',
            payload: {
                address: {
                    locality: 'Pune',
                    region: 'Maharashtra',
                    country: 'India'
                },
                houseType: 'Castle',
                roomType: 'Shared Room',
                description: 'A lovely medieval villa',
                rooms: 3,
                price: 1500,
                owner: '58a6e6a4d881c33e605a0067'
            }
        };
        // server.inject lets you simulate an http request
        Server.inject(options, (response) => {
            //  Expect http response status code to be 200 ("Ok")
            expect(response.statusCode).to.equal(200);
            expect(response.result.message).to.equal('User Saved Successfully');
            Server.stop(done);  // done() callback is required to end the test.
        });
    });
});
