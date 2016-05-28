/**
 * Created by sm on 28/05/16.
 */

import { expect } from 'chai';
import { Map } from 'immutable';

import { MetadatioActions } from '../../src/actions';
import { Item } from '../../src/data';
import { Entity, Field, DataTypes } from '../../src/metadata';
import ItemsReducer from '../../src/reducers/items.reducer';

describe('The entities reducer', () => {

    describe('for managing item information', () => {
        it('should expose a \'reduce\' procedure', () => {
            expect(ItemsReducer.reduce).to.not.be.undefined;
            expect(typeof(ItemsReducer.reduce)).to.equal('function');
        });

        it('should return the same object for a non-interesting reason', () => {
            const state = Map({
                itemCount: 0,
                // items: []
            });

            const nextState = ItemsReducer.reduce(state, { type: 'non-interesting' });
            expect(nextState).to.equal(state);
        });

        describe('upon an ITEM_CREATED action', () => {
            let state = null;
            let entity = null;
            let item = null;

            beforeEach(() => {
                state = Map({
                    itemCount: 0,
                    // items: []
                });

                entity = new Entity({ name: 'entity', fields: [
                    new Field({
                        name: 'field',
                        dataType: DataTypes.string
                    })
                ] });
                item = new Item(entity);
            });


            it('should increase the item count', () => {
                const nextState = ItemsReducer.reduce(state, { type: MetadatioActions.ITEM_CREATED, item });

                expect(nextState).to.not.equal(state);
                expect(nextState.get('itemCount')).to.equal(1);
                // expect(nextState.get('items')).to.deep.equal([{}]);
            });

            it('should create a new EntityReducer to deal with the new item', () => {
                const nextState = ItemsReducer.reduce(state, { type: MetadatioActions.ITEM_CREATED, item });

                expect(ItemsReducer.entities[item.uuid]).to.not.be.undefined;
            });

            it('should recombine reducers whenever a new item is created', () => {
                const nextState = ItemsReducer.reduce(state, { type: MetadatioActions.ITEM_CREATED, item });

                expect(ItemsReducer.entities[item.uuid]).to.not.be.undefined;
            });
        });
    });
})