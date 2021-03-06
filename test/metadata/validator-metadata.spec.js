/**
 * Created by sm on 01/05/16.
 */

/**
 * Created by sm on 30/04/16.
 */

import {expect} from 'chai';

import {Validator, ValidatorTypes} from '../../src/metadata';

describe('Field validators', () => {
    it('should expose a UUID', () => {
        const validator = new Validator(ValidatorTypes.required);
        expect(!validator.uuid).to.equal(false);
    });

    it('should have a type', (done) => {
        try {
            new Validator('wrong', /abc/);
            done(new Error('An exception was expected here'));
        } catch (e) {
            expect(e.className).to.equal('ValidatorException');
            expect(e.code).to.equal('V001');
            done();
        }
    });

    it('should have a validator match', (done) => {
        try {
            new Validator(ValidatorTypes.regex, null);
            done(new Error('An exception was expected here'));
        } catch (e) {
            expect(e.className).to.equal('ValidatorException');
            expect(e.code).to.equal('V002');
            done();
        }
    });

    it('should return false when validating a null value', () => {
        const validator = new Validator(ValidatorTypes.required);
        const result = validator.validate(null);
        expect(result).to.equal(false);
    });

    describe('with \'required\' type', () => {
        it('should not have a validator match', (done) => {
            try {
                new Validator(ValidatorTypes.required, {});
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V003');
                done();
            }
        });

        it('should validate', () => {
            const string = 'abc';

            let validator = new Validator(ValidatorTypes.required);

            expect(validator.validate(string)).to.equal(true);
        });

        it('should not validate null values', () => {
            const string = null;

            let validator = new Validator(ValidatorTypes.required);

            expect(validator.validate(string)).to.equal(false);
        });

        it('should not validate undefined values', () => {
            const string = undefined;

            let validator = new Validator(ValidatorTypes.required);

            expect(validator.validate(string)).to.equal(false);
        });

        it('should not validate empty strings', () => {
            const string = '';

            let validator = new Validator(ValidatorTypes.required);

            expect(validator.validate(string)).to.equal(false);
        });
    });

    describe('with \'exact match\' type', () => {
        it('should validate', () => {
            const string = 'abc';
            const match = 'abc';

            let validator = new Validator(ValidatorTypes.exact, match);

            expect(validator.validate(string)).to.equal(true);
        });

        it('should not allow complex objects as validators', (done) => {
            try {
                new Validator(ValidatorTypes.exact, {});
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V004');
                done();
            }
        });

        it('should not validate complex objects', (done) => {
            try {
                new Validator(ValidatorTypes.exact, "123")
                    .validate({});
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V005');
                done();
            }
        });
    });

    describe('with \'regex\' type', () => {
        it('should validate', () => {
            const string = 'abc';
            const match = /^abc$/;

            let validator = new Validator(ValidatorTypes.regex, match);

            expect(validator.validate(string)).to.deep.equal(!!string.match(match));
        });

        it('should not allow other than regular expressions', (done) => {
            try {
                new Validator(ValidatorTypes.regex, "123");
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V006');
                done();
            }
        });

        it('should only accept strings to validate', (done) => {
            try {
                new Validator(ValidatorTypes.regex, /abc/)
                    .validate(123);
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V007');
                done();
            }
        });
    });

    describe('with \'range\' type', () => {
        it('should validate', () => {
            const string = 25;
            const match = {min: 20, max: 30};

            let validator = new Validator(ValidatorTypes.range, match);

            expect(validator.validate(string)).to.equal(true);
        });

        it('should specify at least one of \'min\' and \'max\'', (done) => {
            try {
                new Validator(ValidatorTypes.range, {});
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V008');
                done();
            }
        });

        it('should only receive numbers on \'min\' and \'max\' options', (done) => {
            try {
                new Validator(ValidatorTypes.range, {min: "abc"});
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V009');
                done();
            }
        });

        it('should only accept numbers to validate', (done) => {
            try {
                new Validator(ValidatorTypes.range, {min: 123})
                    .validate('wrong');
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V010');
                done();
            }
        });
    });

    describe('with \'length\' type', () => {
        it('should validate', () => {
            const string = 'abc';
            const match = {min: 1, max: 3};

            let validator = new Validator(ValidatorTypes.length, match);

            expect(validator.validate(string)).to.equal(true);
        });

        it('should specify at least one of \'min\' and \'max\'', (done) => {
            try {
                new Validator(ValidatorTypes.length, {});
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V011');
                done();
            }
        });

        it('should only receive numbers on \'min\' and \'max\' options', (done) => {
            try {
                new Validator(ValidatorTypes.length, {min: "abc"});
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V012');
                done();
            }
        });

        it('should only accept strings and arrays to validate', (done) => {
            try {
                new Validator(ValidatorTypes.length, {min: 123})
                    .validate(123);
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V013');
                done();
            }
        });
    });

    describe('with \'fn\' type', () => {
        it('should validate using a custom function', () => {
            const string = 'this is custom';
            const match = (value) => {
                return value === 'this is custom';
            };

            let validator = new Validator(ValidatorTypes.fn, match);

            expect(validator.validate(string)).to.equal(true);
        });

        it('should only receive functions', (done) => {
            try {
                new Validator(ValidatorTypes.fn, 'wrong');
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V014');
                done();
            }
        });

        it('should only accept validator functions that return either true or false', (done) => {
            try {
                new Validator(ValidatorTypes.fn, () => {
                    return 'wrong'
                })
                    .validate('value');
                done(new Error('An exception was expected here'));
            } catch (e) {
                expect(e.className).to.equal('ValidatorException');
                expect(e.code).to.equal('V015');
                done();
            }
        });
    });
});