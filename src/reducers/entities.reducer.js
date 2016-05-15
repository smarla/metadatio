/**
 * Created by sm on 14/05/16.
 */

import { List } from 'immutable';
import { combineReducers } from 'redux';

import { EntityReducer } from './injectable';

export class EntitiesReducer {
    static dataInitalState = List.of();

    constructor() {

    }

    dataReducer(state = EntitiesReducer.dataInitalState) {

        return state;
    }

    metadataReducers() {
        const reducers = [];
        return reducers;
    }

    getReducers() {
        const data = this.dataReducer;
        const metadata = this.metadataReducers();

        const reducers = { data };

        if(metadata.length) {
            reducers.metadata = {};
            for(let i = 0; i < metadata.length; i++) {
                const reducer = metadata[i];
                reducers.metadata[reducer.uuid] = reducer;
            }
        }

        return combineReducers(reducers);
    }

    static getInstance() {
        if(!EntitiesReducer.instance) EntitiesReducer.instance = new EntitiesReducer();
        return EntitiesReducer.instance;
    }
}

export default EntitiesReducer.getInstance();