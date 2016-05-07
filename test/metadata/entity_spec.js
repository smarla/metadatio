/**
 * Created by sm on 30/04/16.
 */

import {expect} from 'chai';

import { Entity, Field, DataTypes, Validator, ValidatorTypes } from '../../app/metadata';

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
                expect(e.message).to.equal('Entity name is required');
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
                expect(e.message).to.equal('Entity name must be a string');
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
                expect(e.message).to.equal('Entity name must comply with the specification');
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
                expect(e.message).to.equal('Entity name must have between 2 a 64 characters');
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
                expect(e.message).to.equal('Entity name must have between 2 a 64 characters');
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
});