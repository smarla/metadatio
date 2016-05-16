/**
 * Created by sm on 14/05/16.
 */

export class FieldActions {
    static VALUE_CHANGED        = 'field_value_changed';
    static VALIDATION_CHANGED   = 'field_validation_changed';

    constructor() {

    }

    validate(uuid, value) {

    }

    static getInstance() {
        if(!FieldActions.instance) FieldActions.instance = new FieldActions();
        return FieldActions.instance;
    }
}

export default FieldActions.getInstance();