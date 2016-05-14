/**
 * Created by sm on 14/05/16.
 */

import { combineReducers } from 'redux';

export default function createReducer(asyncReducers) {
    return combineReducers({
        // TODO Add reducers
        ...asyncReducers
    });
}