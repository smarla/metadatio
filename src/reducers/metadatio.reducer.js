/**
 * Created by sm on 14/05/16.
 */

import { List } from 'immutable';
import { combineReducers } from 'redux';

import { EntityReducer } from './injectable';

export class MetadatioReducer {
    static dataInitalState = List.of();

    constructor() {

    }

    dataReducer(state = MetadatioReducer.dataInitalState) {

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
        if(!MetadatioReducer.instance) MetadatioReducer.instance = new MetadatioReducer();
        return MetadatioReducer.instance;
    }
}

export default MetadatioReducer.getInstance();