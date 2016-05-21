/**
 * Created by sm on 14/05/16.
 */

import Store from '../store';
import ValidatorActions from './validator.actions';

export default class FieldActions {
    static VALUE_CHANGED        = 'field_value_changed';

    constructor(store) {
        this.store = store;
        this.validators = new ValidatorActions(store);
    }

    update(field, value) {
        if(field.value === value) return;
        if(value === undefined) value = null;
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