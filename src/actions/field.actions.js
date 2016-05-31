/**
 * Created by sm on 14/05/16.
 */

import { Item } from '../data';
import { Field } from '../metadata';

import { ActionException } from '../exceptions';

export default class FieldActions {
    static VALIDATION_CHANGED = 'field-validation-changed';
    static VALUE_CHANGED = 'field-value-changed';
    static VALUE_CLEARED = 'field-value-cleared';

    constructor(store) {
        this.store = store;
    }

    clear(item, field) {
        if(!item) throw new ActionException('AF006');
        if(!(item instanceof Item)) throw new ActionException('AF007');
        if(!field) throw new ActionException('AF008');
        if(!(field instanceof Field)) throw new ActionException('AF009');
        this.store.dispatch({
            type: FieldActions.VALUE_CLEARED,
            uuid: item.uuid,
            field: field.uuid
        });
    }

    update(item, field, value) {
        if(!item) throw new ActionException('AF001');
        if(!(item instanceof Item)) throw new ActionException('AF002');
        if (!field) throw new ActionException('AF003');
        if (!(field instanceof Field)) throw new ActionException('AF004');
        if (value === undefined) throw new ActionException('AF005');

        this.store.dispatch({
            type: FieldActions.VALUE_CHANGED,
            uuid: item.uuid,
            field: field.uuid,
            value
        });
    }
}