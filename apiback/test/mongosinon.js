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

// Wrap mongoose with mockgoose and then call mongoose as normal
const Mongoose = require('mongoose');
require('sinon-mongoose');

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
describe('Mongo Property', () => {

    it('Create Property', (done) => {

        const propValue = {
            address: {
                locality: 'Pune',
                region: 'Maharashtra',
                country: 'India'
            },
            houseType: 'Castle',
            roomType: 'Shared Room',
            description: 'Should not be created',
            rooms: 3,
            price: 1500,
            owner: '58a6e6a4d881c33e605a0067'
        };
        
        const PropertyMock = Sinon.mock(new PropertyModel(propValue));
        const newProp = PropertyMock.object;
        PropertyMock.expects('save').yields(null);
        newProp.save((error) => {

            expect(error).to.be.null;
        });
        PropertyMock.verify();
        PropertyMock.restore();
        
        done();
    });
    
    it('Stub class save', (done) => {
        
        const propValue = {
            address: {
                locality: 'Simla',
                region: 'Himachal Pradesh',
                country: 'India'
            },
            houseType: 'Castle',
            roomType: 'Entire House',
            description: 'Stubbing class',
            rooms: 6,
            price: 6500,
            owner: '58a6e6a4d881c33e605a0067'
        };
        
        const PropertyMock = Sinon.mock(PropertyModel.prototype, 'save');
        PropertyMock.expects('save').yields(null);
        const newProp = new PropertyModel(propValue);        
        newProp.save((error) => {

            expect(error).to.be.null;
        });
        PropertyMock.verify();
        PropertyMock.restore();
        
        done();
    });
    
    it('Get Property', (done) => {
                
        const PropertyMock = Sinon.mock(PropertyModel);
        const expectedResult = propData;
        PropertyMock.expects('find').yields(null, expectedResult);
        PropertyModel.find(function (err, result) {
            PropertyMock.verify();
            PropertyMock.restore();
            expect(result.length).to.equal(2);
            expect(result[0].houseType).to.equal('Loft');
            expect(result[1].houseType).to.equal('Tent');
            done();
        });
    });
});
