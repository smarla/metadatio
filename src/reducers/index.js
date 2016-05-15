/**
 * Created by sm on 14/05/16.
 */

import entities from './entities.reducer';
import metadatio from './metadatio.reducer';
import { combineReducers } from 'redux';

export default function createReducer(asyncReducers) {
    return combineReducers({
        entities: entities.getReducers(),
        metadatio,
        ...asyncReducers
    });
}