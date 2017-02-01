/**
 * Created by sm on 28/05/16.
 */

import { expect } from 'chai';

import { Core } from '../src';
import { Store } from '../src/store';
import { Entity, Field, DataTypes } from '../src/metadata';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The metadatio core', () => {

    describe('upon construction', () => {
        it('should receive a store', (done) => {
            try {
                const Metadatio = new Core();
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadatioException');
                expect(e.code).to.equal('MC001');
                done();
            }
        });

        it('should verify that the store is an instance of Store', (done) => {
            try {
                const Metadatio = new Core('wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('MetadatioException');
                expect(e.code).to.equal('MC002');
                done();
            }
        });
    });

    describe('after construction', () => {
        let core = null;
        let store = null;

        beforeEach(() => {
            store = new Store();
            core = new Core(store);
        });

        describe('upon initialisation', () => {
            it('should configure the store', () => {
                expect(store.configured).to.equal(false);
                core.init();
                expect(store.configured).to.equal(true);
            });
        });

        describe('and initialisation', () => {
            let entity = null;

            beforeEach(() => {
                core.init();

                entity = new Entity({
                    name: 'entity',
                    fields: [
                        new Field({
                            name: 'name',
                            dataType: DataTypes.string
                        })
                    ]
                });
            });

            describe('when scaffolding', () => {
                it('should verify that an entity is given', (done) => {
                    try {
                        core.scaffold();
                        done(EXPECTING_ERROR);
                    } catch(e) {
                        expect(e.className).to.equal('MetadatioException');
                        expect(e.code).to.equal('MS001');
                        done();
                    }
                });

                it('should verify that the entity given is a instance of Entity', (done) => {
                    try {
                        core.scaffold('wrong');
                        done(EXPECTING_ERROR);
                    } catch(e) {
                        expect(e.className).to.equal('MetadatioException');
                        expect(e.code).to.equal('MS002');
                        done();
                    }
                });

                it('should verify that the data - if given - is an object', (done) => {
                    try {
                        core.scaffold(entity, 'wrong');
                    } catch(e) {
                        expect(e.className).to.equal('MetadatioException');
                        expect(e.code).to.equal('MS003');
                        done();
                    }
                });

                it('should return a fresh empty item', () => {
                    const item = core.scaffold(entity);
                    expect(!item).to.equal(false);
                    expect(item.data.name).to.equal(null);
                });

                it('should create an item with data set', () => {
                    const item = core.scaffold(entity, {
                        name: 'abc'
                    });

                    expect(item.data.name).to.equal('abc');
                });

                it('should allow modifying the fields', () => {
                    const item = core.scaffold(entity);
                    item.data.name = 'Test';
                    expect(item.data.name).to.equal('Test');
                });

                it('should not allow wrong data types', (done) => {
                    try {
                        const item = core.scaffold(entity);
                        item.data.name = 123;
                        done(EXPECTING_ERROR);
                    } catch(e) {
                        done();
                    }
                });
            });

            describe('when importing', () => {
                it('should verfiy that an object is received', (done) => {
                    try {
                        core.import();
                        done(EXPECTING_ERROR);
                    } catch(e) {
                        expect(e.className).to.equal('MetadatioException');
                        expect(e.code).to.equal('MI001');
                        done();
                    }
                });

                it('should verify that the input receive is an object', (done) => {
                    try {
                        core.import('wrong');
                        done(EXPECTING_ERROR);
                    } catch(e) {
                        expect(e.className).to.equal('MetadatioException');
                        expect(e.code).to.equal('MI002');
                        done();
                    }
                });

                it('should create an Entity with the information given', () => {
                    const entity = core.import({
                        name: 'entity',
                        label: 'Entity',
                        namespace: 'ns',
                        fields: [
                            {
                                name: 'field1',
                                label: 'Field 1',
                                dataType: DataTypes.string,
                                validators: {
                                    pattern: {
                                        type: 'regex',
                                        validator: /123/
                                    }
                                }
                            }
                        ]
                    });

                    expect(entity).to.be.an.instanceof(Entity);
                    expect(entity.name).to.equal('entity');
                    expect(entity.label).to.equal('Entity');
                    expect(entity.namespace).to.equal('ns');

                    expect(entity.fields.length).to.equal(1);
                    expect(entity.fields[0]).to.be.an.instanceof(Field);
                    expect(entity.fields[0].name).to.equal('field1');
                    expect(entity.fields[0].label).to.equal('Field 1');
                    expect(entity.fields[0].dataType).to.equal(DataTypes.string);
                    
                    expect(entity.fields[0].validators.pattern).to.not.equal(undefined);
                    expect(entity.fields[0].validators.pattern.type).to.equal('regex');
                    expect(entity.fields[0].validators.pattern.validator).to.deep.equal(/123/);
                });
            });

            describe('when hooking up into actions', () => {
                it('should verify that an action object is sent', (done) => {
                    try {
                        core.on();
                        done(EXPECTING_ERROR);
                    } catch(e) {
                        expect(e.className).to.equal('MetadatioException');
                        expect(e.code).to.equal('MO001');
                        done();
                    }
                });

                it('should verify that the action object is an object', (done) => {
                    try {
                        core.on('wrong');
                        done(EXPECTING_ERROR);
                    } catch(e) {
                        expect(e.className).to.equal('MetadatioException');
                        expect(e.code).to.equal('MO002');
                        done();
                    }
                });

                it('should verify that the action to trigger is sent', (done) => {
                    try {
                        core.on({});
                        done(EXPECTING_ERROR);
                    } catch(e) {
                        expect(e.className).to.equal('MetadatioException');
                        expect(e.code).to.equal('MO003');
                        done();
                    }
                });

                it('should verify that the action to trigger is a function', (done) => {
                    try {
                        core.on({}, 'wrong');
                        done(EXPECTING_ERROR);
                    } catch(e) {
                        expect(e.className).to.equal('MetadatioException');
                        expect(e.code).to.equal('MO004');
                        done();
                    }
                });

                it('should store a hook in the actionHooks config', () => {
                    const match = {};
                    const callback = () => void(0);
                    const actionId = core.on(match, callback);

                    expect(core.actionHooks[actionId][0]).to.equal(callback);
                });
            });
        });
    });
});