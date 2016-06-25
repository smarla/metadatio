/**
 * Created by sm on 14/05/16.
 */

import Metadatio from '../';

import { Map } from 'immutable';
import { combineReducers } from 'redux';

import { CoreActions } from '../actions';
import { InjectableReducer, EntityReducer } from './injectable';
import RawMapReducer from './injectable/raw-map.reducer.js';

export class ItemsReducer {
    static initialState = Map({
        itemCount: 0
    });

    constructor() {
        this.entities = {};
    }

    addEntity(action) {
        this.entities[action.item.uuid] = new EntityReducer(action.item);
    }

    reduce(state = ItemsReducer.initialState, action) {
        switch(action.type) {
            case CoreActions.ITEM_CREATED:

                this.addEntity(action);

                return Map({
                    itemCount: state.get('itemCount') + 1
                });
        }

        return state;
    }

    combine() {
        const reducers = {
            __info: (state = ItemsReducer.initialState, action) => {
                return ItemsReducer.getInstance().reduce(state, action);
            }
        };

        for(let uuid in this.entities) {
            const entity = this.entities[uuid];
            reducers[uuid] = entity.combine();
        }

        return combineReducers(reducers);
    }

    static getInstance() {
        if(!ItemsReducer.instance) ItemsReducer.instance = new ItemsReducer();
        return ItemsReducer.instance;
    }
}

export default ItemsReducer.getInstance();