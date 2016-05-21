/**
 * Created by sm on 14/05/16.
 */

import Store from '../store';
import ValidatorActions from './validator.actions';

export default class FieldActions {
    static VALIDATION_CHANGED = 'field_validation_changed';
    static VALUE_CHANGED = 'field_value_changed';
    static VALUE_CLEARED = 'field_value_cleared';

    constructor(store) {
        this.store = store;
        this.validators = new ValidatorActions(store);
    }

    clear(field) {
        if(field.value === null) return;
        this.store.dispatch({
            type
        });
    }

    update(field, value) {
        if(field.value === value) return;
        field.value = value;

        this.store.dispatch({
            type: FieldActions.VALUE_CHANGED,
            uuid: field.uuid,
            value
        });

        for(let validatorName in field.validators) {
            this.validators.validate(field.validators[validatorName], value);
        }
    }
}