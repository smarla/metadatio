/**
 * Created by sm on 26/05/16.
 */

import  { expect } from 'chai';

import Metadatio from '../../src';
import { Item } from '../../src/data';
import { Entity, Field, DataTypes } from '../../src/metadata';
import MetadatioActions from '../../src/actions/metadatio.actions';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The Metadatio actions', () => {
    let entity = null;
    let store = null;
    let actions = null;
    let item = null;

    beforeEach(() => {
        Metadatio.mock();
        entity = new Entity({
            name: 'entity',
            fields: [
                new Field({
                    name: 'field',
                    dataType: DataTypes.string
                })
            ]
        });
        store = Metadatio.store;
        actions = new MetadatioActions(store);

        item = new Item(entity);
    });
    describe('upon item', () => {

        describe('creation', () => {
            it('should verify that an item is sent', (done) => {
                try {
                    actions.scaffold();
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMI001');
                    done();
                }
            });

            it('should verify that the item is an instance of Item', (done) => {
                try {
                    actions.scaffold('wrong');
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMI002');
                    done();
                }
            });

            it('should verify that an entity is sent', (done) => {
                try {
                    actions.scaffold(item);
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMI003');
                    done();
                }
            });

            it('should verify that the entity is an instance of Entity', (done) => {
                try {
                    actions.scaffold(item, 'wrong');
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMI004');
                    done();
                }
            });

            it.skip('should dispatch ITEM_CREATED when requested', () => {
                actions.scaffold(item, entity);

                expect(store.getActions()[1]).to.deep.equal({
                    type: MetadatioActions.ITEM_CREATED,
                    entity: entity,
                    item: {
                        uuid: item.uuid,
                        data: {
                            field: null
                        }
                    }
                });
            });
        });

        describe('removal', () => {
            it('should verify that an item is sent', (done) => {
                try {
                    actions.removeItem();
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMI005');
                    done();
                }
            });

            it('should verify that the item is an instance of Item', (done) => {
                try {
                    actions.removeItem('wrong');
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMI006');
                    done();
                }
            });

            it('should dispatch ITEM_REMOVED when requested', () => {
                actions.removeItem(item, entity);

                expect(store.getActions()[1]).to.deep.equal({
                    type: MetadatioActions.ITEM_REMOVED,
                    uuid: item.uuid
                });
            });
        });
    });

    describe('upon config management', () => {
        describe('for setting a value', () => {
            it('should verify that a key is sent', (done) => {
                try {
                    actions.setConfig();
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMC001');
                    done();
                }
            });

            it('should verify that the key sent is a string', (done) => {
                try {
                    actions.setConfig(123);
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMC002');
                    done();
                }
            });

            it('should verify that a value is sent', (done) => {
                try {
                    actions.setConfig('key');
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMC003');
                    done();
                }
            });

            it('should dispatch CONFIG_SET when requested', () => {
                actions.setConfig('key', 'value');

                expect(store.getActions()[1]).to.deep.equal({
                    type: MetadatioActions.CONFIG_SET,
                    key: 'key',
                    value: 'value'
                });
            });
        });

        describe('for deleting a value', () => {
            it('should verify that a key is sent', (done) => {
                try {
                    actions.deleteConfig();
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMC004');
                    done();
                }
            });

            it('should verify that the key sent is a string', (done) => {
                try {
                    actions.deleteConfig(123);
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMC005');
                    done();
                }
            });

            it('should dispatch CONFIG_DELETED when requested', () => {
                actions.deleteConfig('key');

                expect(store.getActions()[1]).to.deep.equal({
                    type: MetadatioActions.CONFIG_DELETED,
                    key: 'key'
                });
            });
        });
    });

    describe('upon data management', () => {
        describe('for setting a value', () => {
            it('should verify that a key is sent', (done) => {
                try {
                    actions.setData();
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMD001');
                    done();
                }
            });

            it('should verify that the key sent is a string', (done) => {
                try {
                    actions.setData(123);
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMD002');
                    done();
                }
            });

            it('should verify that a value is sent', (done) => {
                try {
                    actions.setData('key');
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMD003');
                    done();
                }
            });

            it('should dispatch DATA_SET when requested', () => {
                actions.setData('key', 'value');

                expect(store.getActions()[1]).to.deep.equal({
                    type: MetadatioActions.DATA_SET,
                    key: 'key',
                    value: 'value'
                });
            });
        });

        describe('for deleting a value', () => {
            it('should verify that a key is sent', (done) => {
                try {
                    actions.deleteData();
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMD004');
                    done();
                }
            });

            it('should verify that the key sent is a string', (done) => {
                try {
                    actions.deleteData(123);
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('ActionException');
                    expect(e.code).to.equal('AMD005');
                    done();
                }
            });

            it('should dispatch DATA_DELETED when requested', () => {
                actions.deleteData('key');

                expect(store.getActions()[1]).to.deep.equal({
                    type: MetadatioActions.DATA_DELETED,
                    key: 'key'
                });
            });
        });
    });
});