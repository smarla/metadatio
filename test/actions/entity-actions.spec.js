/**
 * Created by sm on 27/05/16.
 */

import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import EntityActions from '../../src/actions/entity.actions';
import { Item } from '../../src/data';
import { Entity, Field, DataTypes } from '../../src/metadata';

const mockStore = configureStore();
const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The entity actions', () => {
    let entity = null;
    let store = null;
    let actions = null;
    let item = null;

    beforeEach(() => {
        entity = new Entity({
            name: 'entity',
            fields: [
                new Field({
                    name: 'field',
                    dataType: DataTypes.string
                })
            ]
        });
        store = mockStore({});
        actions = new EntityActions(store);

        item = new Item(entity);
    });

    describe('for changing an entity', () => {
        it('should verify that an item is sent', (done) => {
            try {
                actions.change();
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AE001');
                done();
            }
        });

        it('should verify that the item is an instance of Item', (done) => {
            try {
                actions.change('wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AE002');
                done();
            }
        });

        it('should verify that a field is sent', (done) => {
            try {
                actions.change(item);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AE003');
                done();
            }
        });

        it('should verify that the field sent is an instance of Field', (done) => {
            try {
                actions.change(item, 'wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AE004');
                done();
            }
        });

        it('should verify that some value is sent to change the entity', (done) => {
            try {
                actions.change(item, entity.fields[0]);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AE005');
                done();
            }
        });

        it('should dispatch ENTITY_CHANGED when an entity field\'s value changes', () => {
            actions.change(item, entity.fields[0], '123');

            expect(store.getActions()).to.deep.equal([{
                type: EntityActions.ENTITY_CHANGED,
                uuid: item.uuid,
                field: entity.fields[0].uuid,
                value: '123'
            }]);
        });
    });

    describe('for destroying an entity', () => {
        it('should verify that an item is sent', (done) => {
            try {
                actions.destroy();
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AE006');
                done();
            }
        });
    
        it('should verify that the item is an instance of Item', (done) => {
            try {
                actions.destroy('wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AE007');
                done();
            }
        });
    
        it('should dispatch ENTITY_DESTROYED when requested', () => {
            actions.destroy(item);
    
            expect(store.getActions()).to.deep.equal([{
                type: EntityActions.ENTITY_DESTROYED,
                uuid: item.uuid
            }]);
        });
    });
});