// Automated testing for HAPI REST APIs using Lab test framework
'use strict';

const Lab = require('lab');           // load Lab module
const lab = exports.lab = Lab.script(); //export test script
const Code = require('code');		 //assertion library
const Sinon = require('sinon');         // stubs library

// Use mocha-like BDD syntax
const describe = lab.describe;
const before = lab.before;
const after = lab.after;
const it = lab.it;
const expect = Code.expect;

// -----------------------------------------------
// Stop server after the tests are run
// -----------------------------------------------
after((done) => {
    Server.stop(done);
});

const propData = [
    {
        address: {
            locality: 'Hyderabad',
            region: 'Andhra Pradesh',
            country: 'India'
        },
        houseType: 'Loft',
        roomType: 'Private Room',
        description: 'Attractive accommodation',
        rooms: 1,
        price: 750,
        owner: '58a6e6a4d881c33e605a0067'
    },
    {
        address: {
            locality: 'Indore',
            region: 'Madhya Pradesh',
            country: 'India'
        },
        houseType: 'Tent',
        roomType: 'Entire House',
        description: 'Pleasant surroundings',
        rooms: 2,
        price: 450,
        owner: '58a6e6a4d881c33e605a0067'
    }
];

// Importing `property` mongoose db model
const PropertyModel = require('../models/property');

const Server = require('../server.js');
describe('Basic HTTP Tests', () => {

    it('GET api/property (endpoint test)', { timeout: 5000 }, (done) => {

        const options = {
            method: 'GET',
            url: '/api/property'
        };
        
        const PropertyMock = Sinon.mock(PropertyModel);
        const expectedResult = propData;
        PropertyMock.expects('find').yields(null, expectedResult);
        
        // server.inject lets you simulate an http request
        Server.inject(options, (response) => {
            
            PropertyMock.verify();
            PropertyMock.restore();
            expect(response.result.data.length).to.equal(2);
            expect(response.result.data[0].houseType).to.equal('Loft');
            expect(response.result.data[1].houseType).to.equal('Tent');

            
            //  Expect http response status code to be 200 ("Ok")
            expect(response.statusCode).to.equal(200);
            expect(response.result.message).to.equal('Property Data Successfully Fetched');
            expect(response.result.data [0].price).to.equal(750);
            done ();
            //Server.stop(done);  // done() callback is required to end the test.
        });
    });

    it('POST api/property success', (done) => {

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

        const PropertyMock = Sinon.mock(PropertyModel.prototype, 'save');
        PropertyMock.expects('save').yields(null);

        // server.inject lets you simulate an http request
        Server.inject(options, (response) => {

            PropertyMock.verify();
            PropertyMock.restore();

            //  Expect http response status code to be 200 ("Ok")
            expect(response.statusCode).to.equal(200);
            expect(response.result.message).to.equal('Property Saved Successfully');
            done ();
        });
    });

    it('POST api/property error', (done) => {

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

        const PropertyMock = Sinon.mock(PropertyModel.prototype, 'save');
        PropertyMock.expects('save').yields('DB Error');

        // server.inject lets you simulate an http request
        Server.inject(options, (response) => {

            PropertyMock.verify();
            PropertyMock.restore();

            //  Expect error response
            expect(response.statusCode).to.equal(503);
            expect(response.result.message).to.equal('Internal MongoDB error');
            done ();
        });
    });
});
