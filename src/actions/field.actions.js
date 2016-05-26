/**
 * Created by sm on 14/05/16.
 */

import Store from '../store';
import ValidatorActions from './validator.actions';
import { Field } from '../metadata';

import { ActionException } from '../exceptions';

export default class FieldActions {
    static VALIDATION_CHANGED = 'field_validation_changed';
    static VALUE_CHANGED = 'field_value_changed';
    static VALUE_CLEARED = 'field_value_cleared';

    constructor(store) {
        this.store = store;
        this.validators = new ValidatorActions(store);
    }

    clear(field) {
        if(!field) throw new ActionException('AF004');
        if(!(field instanceof Field)) throw new ActionException('AF005');
        this.store.dispatch({
            type: FieldActions.VALUE_CLEARED,
            uuid: field.uuid
        });
    }

    update(field, value) {
        if (!field) throw new ActionException('AF001');
        if (!(field instanceof Field)) throw new ActionException('AF002');
        if (value === undefined) throw new ActionException('AF003');

        this.store.dispatch({
            type: FieldActions.VALUE_CHANGED,
            uuid: field.uuid,
            value
        });
    }
}