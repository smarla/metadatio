/**
 * Created by sm on 14/05/16.
 */

import { combineReducers } from 'redux';

import MetadatioReducer from './metadatio.reducer';
import injectable from './injectable';

const CombinedReducer = (asyncReducers) => {
    const metadatio = MetadatioReducer.reducers();

    return combineReducers({
        ...metadatio,
        ...asyncReducers
    });
};

module.exports = {
    CombinedReducer,
    MetadatioReducer,
    injectable
};