/**
 * Created by sm on 14/05/16.
 */

import entities from './entities.reducer';
import { combineReducers } from 'redux';

export default function createReducer(asyncReducers) {
    return combineReducers({
        entities: entities.getReducers(),
        ...asyncReducers
    });
}