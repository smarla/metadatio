/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import InjectableReducer from './injectable.reducer';

export default class ValidatorReducer extends InjectableReducer {
    static initialState = Map({
        uuid: null,
        valid: true,
        validatorType: null
    });

    constructor(uuid) {
        super({ uuid: uuid, initialState: ValidatorReducer.initialState});

        return this.reduce;
    }

    reduce(state = ValidatorReducer.initialState) {
        return state;
    }
}