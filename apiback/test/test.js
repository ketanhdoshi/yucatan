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
