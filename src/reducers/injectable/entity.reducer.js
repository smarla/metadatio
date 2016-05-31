/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import { combineReducers } from 'redux';

import EntityActions from '../../actions/entity.actions';
import { Item } from '../../data';
import { Entity } from '../../metadata';
import InjectableReducer from './injectable.reducer';
import FieldReducer from './field.reducer';
import { ReducerException } from '../../exceptions';


export default class EntityReducer extends InjectableReducer {
    static initialState = Map({
        uuid: null,
        changedAt: null
    });

    constructor(item) {
        if(!item) throw new ReducerException('RIE001');
        if(!(item instanceof Item)) throw new ReducerException('RIE002');

        const entity = item.__entity;

        super({
            uuid: item.uuid,
            initialState: Map({
                uuid: item.uuid,
                changedAt: null
            })
        });

        this.fields = {};
        for(let i = 0; i < entity.fields.length; i++) {
            const field = entity.fields[i];
            const fieldName = field.name;
            const uuid = field.uuid;
            const reducer = new FieldReducer(item, field);
            this.fields[fieldName] = reducer;
        }
    }

    combine() {
        const objFields = {};
        for(let fieldName in this.fields) {
            const field = this.fields[fieldName];
            objFields[fieldName] = field.combine();
        }

        const fields = combineReducers(objFields);
        return combineReducers({
            info: InjectableReducer.doReduce(this),
            fields
        });
    }

    reduce(state = EntityReducer.initialState, action) {
        switch(action.type) {
            case EntityActions.ITEM_CHANGED:
                return Map({
                    uuid: state.get('uuid'),
                    changedAt: action.changedAt
                });
        }

        return state;
    }
}