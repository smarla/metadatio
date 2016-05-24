/**
 * Created by sm on 24/05/16.
 */

import { expect } from 'chai';

import { Item } from '../../src/data';
import { Entity, Field, DataTypes, Validator, ValidatorTypes } from '../../src/metadata';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The data item', () => {
    describe('upon creation', () => {
        it('should verify that an entity is received', (done) => {
            try {
                new Item();
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ItemException');
                expect(e.code).to.equal('I001');
                done();
            }
        });

        it('should verify that the attribute received is an Entity', (done) => {
            try {
                new Item('wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ItemException');
                expect(e.code).to.equal('I002');
                done();
            }
        });

        describe('and using the entity received', () => {
            let entity = null;
            let item = null;
            beforeEach(() => {
                entity = new Entity({
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
                });

                item = new Item(entity);
            });

            it('should expose the Entity name as className', () => {
                expect(item.className).to.equal(entity.name);
            });

            it('should have a read-only className', (done) => {
                try {
                    item.className = 'test';
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ItemException');
                    expect(e.code).to.equal('I003');
                    done();
                }
            });

            it('should expose properties for each of the fields on the \'data\' attribute', () => {
                expect(item.data.name).to.not.be.undefined;
                expect(item.data.name).to.be.null;
                expect(item.data.age).to.not.be.undefined;
                expect(item.data.age).to.be.null;
            });
        });
    });

    describe('upon edition', () => {
        let entity = null;
        let item = null;
        beforeEach(() => {
            entity = new Entity({
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
            });

            item = new Item(entity);
        });

        it('should be able to edit data attributes', () => {
            item.data.name = 'abc';

            expect(item.data.name).to.equal('abc');
        });

        it('should not allow getting a non-existing field', (done) => {
            try {
                item.data.test;
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ItemException');
                expect(e.code).to.equal('I004')
                done();
            }
        });

        it('should not allow editing a non-existing field', (done) => {
            try {
                item.data.test = 'something';
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ItemException');
                expect(e.code).to.equal('I005')
                done();
            }
        });

        it('should validate the field against field\'s validation for data types', (done) => {
            try {
                item.data.name = 123;
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('DataValidationException');
                expect(e.code).to.equal('DV002');
                done();
            }
        });
    });
});