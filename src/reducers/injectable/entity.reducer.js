/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import { combineReducers } from 'redux';

import { Entity } from '../../metadata';
import InjectableReducer from './injectable.reducer';
import FieldReducer from './field.reducer';
import { ReducerException } from '../../exceptions';


export default class EntityReducer extends InjectableReducer {
    static initialState = Map({
        uuid: null,
        entityType: null
    });

    constructor(entity) {
        if(!entity) throw new ReducerException('RIE001');
        if(!(entity instanceof Entity)) throw new ReducerException('RIE002');

        super({
            uuid: entity.uuid,
            initialState: EntityReducer.initialState
        });
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
}