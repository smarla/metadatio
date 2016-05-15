/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import InjectableReducer from './injectable.reducer';
import ValidatorReducer from './validator.reducer';

import { combineReducers } from 'redux';

export default class FieldReducer extends InjectableReducer {
    static initialState = Map({
        uuid: null,
        fieldType: null,
        value: null,
        valid: true
    });

    constructor(uuid) {
        super({ uuid: uuid, initialState: FieldReducer.initialState});
    }

    combine() {
        const validation = this.getValidatorReducers();

        return combineReducers({
            info: this.reduce,
            validation
        });
    }

    reduce(state = FieldReducer.initialState) {
        return state;
    }

    getValidatorReducers() {
        const reducers = {
            'f456-765-abc': new ValidatorReducer('f456-765-abc')
        };

        return combineReducers(reducers);
    }
}