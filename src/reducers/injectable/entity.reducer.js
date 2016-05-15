/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import InjectableReducer from './injectable.reducer';
import FieldReducer from './field.reducer';

import { combineReducers } from 'redux';

export default class EntityReducer extends InjectableReducer {
    static initialState = Map({
        uuid: null,
        entityType: null
    });

    constructor(uuid) {
        super({ uuid: uuid, initialState: EntityReducer.initialState});
    }

    combine() {
        const fields = this.getFieldReducers();
        return combineReducers({
            info: this.reduce,
            fields
        });
    }

    reduce(state = EntityReducer.initialState) {
        return state;
    }

    getFieldReducers() {
        const reducer = new FieldReducer('f456-765-abc');
        const reducers = {
            'f456-765-abc': reducer.combine()
        };

        return combineReducers(reducers);
    }
}