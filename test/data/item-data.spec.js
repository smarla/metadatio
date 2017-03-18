/**
 * Created by sm on 24/05/16.
 */

import { expect } from 'chai';

import { Item } from '../../src/data';
import { Entity, Field, DataTypes, Validator, ValidatorTypes } from '../../src/metadata';

const EXPECTING_ERROR = new Error('An exception was expected here');

let entity = null;
let item = null;
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

        it('should have a uuid', () => {
            const entity = new Entity({
                name: 'entity',
                label: 'My Entity'
            });

            const item1 = new Item(entity);
            const item2 = new Item(entity);

            expect(item1.uuid).to.not.be.undefined;
            expect(item2.uuid).to.not.be.undefined;
            expect(item1.uuid).to.not.equal(item2.uuid);
        });

        describe('and using the entity received', () => {
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

            it('should expose the Entity as __entity', () => {
                expect(item.__entity).to.equal(entity);
            });

            it('should have a read-only __entity', (done) => {
                try {
                    item.__entity = 'something';
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ItemException');
                    expect(e.code).to.equal('I004');
                    done();
                }
            });

            it('should expose properties for each of the fields on the \'data\' attribute', () => {
                expect(item.data.name).to.not.be.undefined;
                expect(item.data.name).to.be.null;
                expect(item.data.age).to.not.be.undefined;
                expect(item.data.age).to.be.null;
            });

            it('should expose field information on the \'fields\' attribute', () => {
                item.data.name = 'cde';
                expect(item.fields.name.valid).to.equal(false);
                expect(item.fields.name.validators.pattern).to.equal(false);
            });

            describe('when data is also sent', () => {
                it('should verify that the item is an object', (done) => {
                    try {
                        new Item(entity, 'wrong');
                    } catch(e) {
                        expect(e.className).to.equal('ItemException');
                        expect(e.code).to.equal('I007');
                        done();
                    }
                });

                it('should save the data as values', () => {
                    const myItem = new Item(entity, {
                        name: 'abc',
                        age: 21
                    });

                    expect(myItem.data.name).to.equal('abc');
                    expect(myItem.data.age).to.equal(21);
                })
            })
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
                            range: new Validator(ValidatorTypes.range, { min: 18, max: 64 })
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
                expect(e.code).to.equal('I005');
                done();
            }
        });

        it('should not allow editing a non-existing field', (done) => {
            try {
                item.data.test = 'something';
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ItemException');
                expect(e.code).to.equal('I006');
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

        describe('for having full information about the status of the item', () => {
            
            it('should have validation status of the whole item', () => {
                item.data.name = 'abc';
                item.data.age = 21;
                expect(item.valid).to.equal(true);
                item.data.name = 'cde';
                expect(item.valid).to.equal(false);
            });

            it('should have local overall validation of the field', () => {
                item.data.name = 'abc';
                expect(item.fields.name.valid).to.equal(true);
                item.data.name = 'ab';
                expect(item.fields.name.valid).to.equal(false);
            });

            it('should have access to each of the validators of the field', () => {
                item.data.name = 'abc';
                expect(item.fields.name.validators.pattern).to.equal(true);
                item.data.name = 'ab';
                expect(item.fields.name.validators.pattern).to.equal(false);
            });

            it('should not allow accessing an unexisting field\'s info', (done) => {
                try {
                    item.fields.wrong.valid;
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ItemException');
                    expect(e.code).to.equal('II001');
                    done();
                }
            });

            it('should not allow modifying any parameter on field info', (done) => {
                try {
                    item.fields.name = 'wrong';
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ItemException');
                    expect(e.code).to.equal('II002');
                    done();
                }
            });

            it('should not allow editing any property in the field information', (done) => {
                try {
                    item.fields.name.valid = false;
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ItemException');
                    expect(e.code).to.equal('II003');
                    done();
                }
            });

            it('should not allow fetching any undefined property on field info', (done) => {
                try {
                    item.fields.name.wrong;
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ItemException');
                    expect(e.code).to.equal('II004');
                    done();
                }
            });

            it('should serialize the item into a plain object', () => {
                item.data.name = 'test';
                item.data.age = 21;

                const obj = item.serialize();

                expect(obj).to.not.be.undefined;
                expect(obj.uuid).to.equal(item.uuid);
                expect(obj.data.name).to.equal(item.data.name);
                expect(obj.data.age).to.equal(item.data.age);
            })
        });
    });
});