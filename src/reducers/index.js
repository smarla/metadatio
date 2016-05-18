/**
 * Created by sm on 14/05/16.
 */

import MetadatioReducer from './metadatio.reducer';
import { combineReducers } from 'redux';

export default function createReducer(asyncReducers) {
    const metadatio = MetadatioReducer.getReducers();

    return combineReducers({
        metadatio,
        ...asyncReducers
    });
}