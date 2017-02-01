/**
 * Created by sm on 14/05/16.
 */

import { Item } from '../data';
import { Field, Validator } from '../metadata';
import { ActionException } from '../exceptions';

export default class ValidatorActions {
    static VALIDATION_OK = 'validator_validation_ok';
    static VALIDATION_KO = 'validator_validation_ko';

    constructor(Store) {
        this.store = Store;
    }

    validate(item, field, validator, validation) {
        if(!item) throw new ActionException('AV001');
        if(!(item instanceof Item)) throw new ActionException('AV002');
        if(!field) throw new ActionException('AV003');
        if(!(field instanceof Field)) throw new ActionException('AV004');
        if(!validator) throw new ActionException('AV005');
        if(!(validator instanceof Validator)) throw new ActionException('AV006');
        if(validation === undefined) throw new ActionException('AV007');
        if(typeof(validation) !== 'boolean') throw new ActionException('AV008');

        const uuid = item.uuid;
        const type = validation ? ValidatorActions.VALIDATION_OK : ValidatorActions.VALIDATION_KO;

        const result = {
            type,
            uuid,
            field: field.uuid,
            validator: validator.uuid
        };

        this.store.dispatch(result);
    }
}