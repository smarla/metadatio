/**
 * Created by sm on 30/04/16.
 */

import {expect} from 'chai';

import { Field, DataTypes, Validator, ValidatorTypes } from '../../src';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('Base field component', () => {

    describe('upon construction', () => {
        it('should be configured with basic metadata', () => {
            const metadata = {
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string,
                multiplicity: 'one'
            };

            const field = new Field(metadata);

            expect(field.name).to.equal(metadata.name);
        });

        it('should not allow corrupted metadata (no field name)', (done) => {
            const metadata = {
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string
            };

            try {
                new Field(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIF001');
                done();
            }
        });

        it('should not allow corrupted metadata (non-string field name)', (done) => {
            const metadata = {
                name: 123,
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string

            };

            try {
                new Field(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIF002');
                done();
            }
        });

        it('should not allow corrupted metadata (wrong field name)', (done) => {
            const metadata = {
                name: 'abc$',
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string

            };

            try {
                new Field(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIF003');
                done();
            }
        });

        it('should not allow corrupted metadata (name length below 2)', (done) => {
            const metadata = {
                name: 'a',
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string

            };

            try {
                new Field(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIF004');
                done();
            }
        });

        it('should not allow corrupted metadata (name length above 64)', (done) => {
            const metadata = {
                name: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string

            };

            try {
                new Field(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIF004');
                done();
            }
        });

        it('should not allow corrupted metadata (no field dataType)', (done) => {
            const metadata = {
                name: 'name',
                label: "Name of your app",
                shortLabel: null,
                hint: null
            };

            try {
                new Field(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIF005');
                done();
            }
        });

        it('should have valid data type', (done) => {
            const metadata = {
                name: 'name',
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: 'wrong'
            };

            try {
                new Field(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIF006');
                done();
            }
        });

        it('should not allow corrupted metadata (wrong multiplicity)', (done) => {
            const metadata = {
                name: 'name',
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string,
                multiplicity: 'wrong'
            };

            try {
                new Field(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIF007');
                done();
            }
        });

        describe('with validations included', () => {
            it('should successfully include validators to the field', () => {
                const metadata = {
                    name: "name",
                    label: "Name of your app",
                    shortLabel: null,
                    hint: null,
                    dataType: DataTypes.string,
                    multiplicity: 'one',
                    validators: {
                        'valid-characters': new Validator(ValidatorTypes.regex, /123/)
                    }
                };

                const field = new Field(metadata);

                expect(field.validators).to.deep.equal(metadata.validators);
            });

            it('should not allow non-Validator instances to be included', (done) => {
                const metadata = {
                    name: "name",
                    label: "Name of your app",
                    shortLabel: null,
                    hint: null,
                    dataType: DataTypes.string,
                    multiplicity: 'one',
                    validators: {
                        'valid-characters': 'wrong'
                    }
                };

                try {
                    new Field(metadata);
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('MetadataIntegrityException');
                    expect(e.code).to.equal('MIV002');
                    done();
                }
            });
        })
    });

    describe('at runtime', () => {
        let metadata = null;
        let field = null;

        beforeEach(() => {

            metadata = {
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string,
                multiplicity: 'one'
            };

            field = new Field(metadata);
        });

        it('should allow to include further validators', () => {
            const name = 'validator-name';
            const validator = new Validator(ValidatorTypes.regex, /123/);

            field.addValidator(name, validator);

            expect(field.validators[name]).to.deep.equal(validator);
        });
        
        it('should not allow validators without a name', (done) => {
            const name = null;
            const validator = new Validator(ValidatorTypes.regex, /123/);

            try {
                field.addValidator(name, validator);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIV001');
                done();
            }
        });

        it('should not allow validators with an empty name', (done) => {
            const name = '';
            const validator = new Validator(ValidatorTypes.regex, /123/);

            try {
                field.addValidator(name, validator);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIV001');
                done();
            }
        });

        it('should not allow validators with a non-string name', (done) => {
            const name = 123;
            const validator = new Validator(ValidatorTypes.regex, /123/);

            try {
                field.addValidator(name, validator);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIV001');
                done();
            }
        });

        it('should not allow overwriting validators if not specified', (done) => {
            const name = 'validator-name';
            const validator = new Validator(ValidatorTypes.regex, /123/);
            field.addValidator(name, validator);

            try {
                field.addValidator(name, validator);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIV003');
                done();
            }
        });

        it('should allow overwriting validator if \'overwrite\' flag is set', () => {
            const name = 'validator-name';
            const validator = new Validator(ValidatorTypes.regex, /123/);
            const validator2 = new Validator(ValidatorTypes.exact, 123);
            field.addValidator(name, validator);

            field.addValidator(name, validator2, true);

            expect(field.validators[name]).to.deep.equal(validator2);
        });

        it('should not allow non-Validator instances', (done) => {
            const name = 'validator-name';
            const validator = 'wrong';

            try {
                field.addValidator(name, validator);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIV002');
                done();
            }
        });
    });

    describe('upon validation', () => {

        it('should raise an error if value is undefined', (done) => {
            const metadata = {
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string,
                multiplicity: 'one'
            };

            const field = new Field(metadata);

            const value = undefined;

            try {
                field.validate(value);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('DataValidationException');
                expect(e.message).to.equal('Field value is undefined');
                done();
            }
        });

        it('should validate null values if there are no validators', () => {
            const metadata = {
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string,
                multiplicity: 'one'
            };

            const field = new Field(metadata);

            const value1 = null;

            const validate1 = field.validate(value1);

            expect(validate1).to.equal(true);
        });

        it('should validate that input is a String for string data types', (done) => {
            const metadata = {
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string,
                multiplicity: 'one'
            };

            const field = new Field(metadata);

            const value = 123;

            try {
                field.validate(value);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('DataValidationException');
                expect(e.message).to.equal('Values for data type \'string\' must be strings');
                done();
            }
        });

        it('should validate that input is a number for number data types', (done) => {
            const metadata = {
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.number,
                multiplicity: 'one'
            };

            const field = new Field(metadata);

            const value = '123';

            try {
                field.validate(value);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('DataValidationException');
                expect(e.message).to.equal('Values for data type \'number\' must be numbers');
                done();
            }
        });

        it('should accept a boolean value for boolean data types', () => {
            const metadata = {
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.boolean,
                multiplicity: 'one'
            };

            const field = new Field(metadata);

            const value = true;

            const validation = field.validate(value);

            expect(validation).to.equal(true);
        });

        it('should fail if input is not a boolean for boolean data types', (done) => {
            const metadata = {
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.boolean,
                multiplicity: 'one'
            };

            const field = new Field(metadata);

            const value = '123';

            try {
                field.validate(value);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('DataValidationException');
                expect(e.message).to.equal('Values for data type \'boolean\' must be either true or false');
                done();
            }
        });

        it('should accept a date or a timestamp for date data types', () => {
            const metadata = {
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.date,
                multiplicity: 'one'
            };

            const field = new Field(metadata);

            const value = new Date();

            const validates = field.validate(value);

            expect(validates).to.equal(true);
        });

        it('should fail if input is not a date nor a timestamp for date data types', (done) => {
            const metadata = {
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.date,
                multiplicity: 'one'
            };

            const field = new Field(metadata);

            const value = '123';

            try {
                field.validate(value);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('DataValidationException');
                expect(e.message).to.equal('Values for data type \'date\' must be either dates or timestamps');
                done();
            }
        });

        it('should validate data against validators', () => {
            const metadata = {
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string,
                multiplicity: 'one',
                validators: {
                    pattern: new Validator(ValidatorTypes.regex, /^123$/)
                }
            };

            const field = new Field(metadata);

            const value1 = '123';
            const value2 = 'abc';

            const validate1 = field.validate(value1);
            const validate2 = field.validate(value2);

            expect(validate1).to.equal(true);
            expect(validate2).to.equal(false);
        });
    });
});