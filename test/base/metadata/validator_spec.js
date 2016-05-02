/**
 * Created by sm on 01/05/16.
 */

/**
 * Created by sm on 30/04/16.
 */

import {expect} from 'chai';

import {Validator, ValidatorTypes} from '../../../app/metadata';

describe('Validators set for fields', () => {
   it('should have a type', (done) => {
       try {
           new Validator('wrong', /abc/);
           done(new Error('An exception was expected here'));
       } catch(e) {
           expect(e.className).to.equal('ValidatorException');
           expect(e.message).to.equal('Validator type is wrong');
           done();
       }
   });

    it('should have a validator match', (done) => {
        try {
            new Validator(ValidatorTypes.regex, null);
            done(new Error('An exception was expected here'));
        } catch(e) {
            expect(e.className).to.equal('ValidatorException');
            expect(e.message).to.equal('Validator does not have a match to check');
            done();
        }
    });

    it('should validate exact match', () => {
        const string = 'abc';
        const match = 'abc';

        let validator = new Validator(ValidatorTypes.exact, match);

        expect(validator.validate(string)).to.equal(true);
    });

    it('should validate regular expressions', () => {
        const string = 'abc';
        const match = /^abc$/;

        let validator = new Validator(ValidatorTypes.regex, match);

        expect(validator.validate(string)).to.deep.equal(!!string.match(match));
    });

    it('should not allow other than regular expressions for \'regex\' validation', (done) => {
        try {
            new Validator(ValidatorTypes.regex, "123");
            done(new Error('An exception was expected here'));
        } catch(e) {
            expect(e.className).to.equal('ValidatorException');
            expect(e.message).to.equal('Validator for type \'regex\' must be a regular expression');
            done();
        }
    });

    it('should validate ranges', () => {
        const string = 25;
        const match = { min: 20, max: 30 };

        let validator = new Validator(ValidatorTypes.range, match);

        expect(validator.validate(string)).to.equal(true);
    });

    it('should specify one of \'min\' and \'max\' for \'range\' validation', (done) => {
        try {
            new Validator(ValidatorTypes.range, {});
            done(new Error('An exception was expected here'));
        } catch(e) {
            expect(e.className).to.equal('ValidatorException');
            expect(e.message).to.equal('Validator for type \'range\' must specify at least one of \'min\' and \'max\'');
            done();
        }
    });

    it('should only receive numbers on \'min\' and \'max\' options for \'range\' validation', (done) => {
        try {
            new Validator(ValidatorTypes.range, {min: "abc"});
            done(new Error('An exception was expected here'));
        } catch(e) {
            expect(e.className).to.equal('ValidatorException');
            expect(e.message).to.equal('Options (min, max) for \'range\' validators must be numbers');
            done();
        }
    });

    it('should validate lengths', () => {
        const string = 'abc';
        const match = { min: 1, max: 3 };

        let validator = new Validator(ValidatorTypes.length, match);

        expect(validator.validate(string)).to.equal(true);
    });

    it('should validate custom validation functions', () => {
        const string = 'this is custom';
        const match = (value) => {
            return value === 'this is custom';
        };

        let validator = new Validator(ValidatorTypes.fn, match);

        expect(validator.validate(string)).to.equal(true);
    });
});