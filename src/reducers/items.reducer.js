/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import { combineReducers } from 'redux';

import { MetadatioActions } from '../actions';
import { InjectableReducer, EntityReducer } from './injectable';
import RawMapReducer from './injectable/raw-map.reducer.js';

export class ItemsReducer {
    static initialState = Map({});

    constructor() {
        this.entities = {};
    }

    reduce(state = ItemsReducer.initialState, action) {
        switch(action.type) {
            case MetadatioActions.ITEM_CREATED:
                const items = state.get('items');
                this.entities[action.item.uuid] = new EntityReducer(action.item.__entity);
                

                return Map({
                    itemCount: state.get('itemCount') + 1
                    // items
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