/**
 * Created by sm on 30/04/16.
 */

import {expect} from 'chai';

import { Field, DataTypes, Validator, ValidatorTypes } from '../../app/metadata';

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
                expect(e.message).to.equal('Field name is required');
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
                expect(e.message).to.equal('Field name must be a string');
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
                expect(e.message).to.equal('Field name must comply with the specification');
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
                expect(e.message).to.equal('Field name must have between 2 and 64 characters');
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
                expect(e.message).to.equal('Field name must have between 2 and 64 characters');
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
                expect(e.message).to.equal('Data type is not defined');
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
                expect(e.message).to.equal('Data type is invalid');
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
                expect(e.message).to.equal('Multiplicity is neither \'one\' nor \'many\'');
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
                    expect(e.message).to.equal('Validators must be instances of \'Validator\'');
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
                expect(e.message).to.equal('Validator name must be given, and be a string');
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
                expect(e.message).to.equal('Validator name must be given, and be a string');
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
                expect(e.message).to.equal('Validator name must be given, and be a string');
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
                expect(e.message).to.equal('A validator already exists with name' + name + ' and \'overwrite\' flag has not been set');
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
                expect(e.message).to.equal('Validators must be instances of \'Validator\'');
                done();
            }
        });
    })
});