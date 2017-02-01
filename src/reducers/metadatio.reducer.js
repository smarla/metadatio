/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import { combineReducers } from 'redux';

import { InjectableReducer, EntityReducer } from './injectable';
import ItemsReducer from './items.reducer';
import RawMapReducer from './injectable/raw-map.reducer.js';
import MetadatioActions from '../actions/metadatio.actions';

export class MetadatioReducer {
    static initialState = Map({});

    constructor() {
        const config_uuid = 'metadatio-config';
        const config_subreducers = { set: MetadatioActions.CONFIG_SET, delete: MetadatioActions.CONFIG_DELETED };
        this.configReducer = new RawMapReducer({ uuid: config_uuid, subreducers: config_subreducers });

        const data_uuid = 'metadatio-data';
        const data_subreducers = { set: MetadatioActions.DATA_SET, delete: MetadatioActions.DATA_DELETED };
        this.dataReducer = new RawMapReducer({ uuid: data_uuid, subreducers: data_subreducers });
    }

    reducers() {
        const config = InjectableReducer.doReduce(this.configReducer);
        const data = InjectableReducer.doReduce(this.dataReducer);
        const items = ItemsReducer.combine();

        return {
            config,
            data,
            items
        };
    }

    static getInstance() {
        if(!MetadatioReducer.instance) MetadatioReducer.instance = new MetadatioReducer();
        return MetadatioReducer.instance;
    }
}

export default MetadatioReducer.getInstance();