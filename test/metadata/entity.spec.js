/**
 * Created by sm on 30/04/16.
 */

import {expect} from 'chai';

import { Entity, Field, DataTypes, Validator, ValidatorTypes } from '../../src';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('Metadatio entities', () => {

    describe('upon construction', () => {
        it('should be configured with basic metadata', () => {
            const metadata = {
                name: 'my-entity',
                label: 'My Entity'
            };

            const entity = new Entity(metadata);

            expect(entity.name).to.equal(metadata.name);
            expect(entity.label).to.equal(metadata.label);
        });

        it('should not allow an entity without name', (done) => {
            const metadata = {
                name: null,
                label: 'My Entity'
            };

            try {
                new Entity(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIE001');
                done();
            }
        });

        it('should not allow an entity with a non-string name', (done) => {
            const metadata = {
                name: 123,
                label: 'My Entity'
            };

            try {
                new Entity(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIE002');
                done();
            }
        });

        it('should not allow an entity with an invalid name', (done) => {
            const metadata = {
                name: 'abc$',
                label: 'My Entity'
            };

            try {
                new Entity(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIE003');
                done();
            }
        });

        it('should not allow an entity with a name length below 2', (done) => {
            const metadata = {
                name: 'a',
                label: 'My Entity'
            };

            try {
                new Entity(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIE004');
                done();
            }
        });

        it('should not allow an entity with a name length above 64 characters', (done) => {
            const metadata = {
                name: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                label: 'My Entity'
            };

            try {
                new Entity(metadata);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.code).to.equal('MIE004');
                done();
            }
        });
        
        it('should allow field inclusion', () => {
            const metadata = {
                name: 'entity',
                label: 'My Entity',
                fields: [
                    new Field({
                        name: 'name',
                        label: "Name of your app",
                        shortLabel: null,
                        hint: null,
                        dataType: DataTypes.string
                    })
                ]
            };

            const entity = new Entity(metadata);

            expect(entity.fields[0]).to.deep.equal(metadata.fields[0]);
        });
    });

    describe('upon validation', () => {
        it('validate the whole entity against all field validators', () => {
            const metadata = {
                name: 'entity',
                label: 'My Entity',
                fields: [
                    new Field({
                        name: 'name',
                        shortLabel: null,
                        hint: null,
                        dataType: DataTypes.string,
                        validators: {
                            pattern: new Validator(ValidatorTypes.regex, /^abc$/)
                        }
                    }),
                    new Field({
                        name: 'age',
                        shortLabel: null,
                        hint: null,
                        dataType: DataTypes.number,
                        validators: {
                            pattern: new Validator(ValidatorTypes.range, { min: 18, max: 64 })
                        }
                    })
                ]
            };

            const entity = new Entity(metadata);

            const item1 = {
                name: 'abc',
                age: 20
            };

            expect(entity.validate(item1)).to.equal(true);

            const item2 = {
                name: '123',
                age: 20
            };

            expect(entity.validate(item2)).to.equal(false);

            const item3 = {
                name: 'abc',
                age: 12
            };

            expect(entity.validate(item3)).to.equal(false);
        });
    });
});