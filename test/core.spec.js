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

                it('should return a fresh empty item', () => {
                    const item = core.scaffold(entity);
                    expect(!item).to.equal(false);
                    expect(item.data.name).to.equal(null);
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
        });
    });
});