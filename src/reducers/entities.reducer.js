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
        const reducer = new EntityReducer('1234-abcd');
        const reducers = {
            '1234-abcd': reducer.combine()
        };

        return combineReducers(reducers);
    }

    getReducers() {
        const data = this.dataReducer;
        const metadata = this.metadataReducers();

        return combineReducers({
            data,
            metadata
        });
    }

    static getInstance() {
        if(!EntitiesReducer.instance) EntitiesReducer.instance = new EntitiesReducer();
        return EntitiesReducer.instance;
    }
}

export default EntitiesReducer.getInstance();