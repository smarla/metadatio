/**
 * Created by sm on 14/05/16.
 */

import Store from '../store';

export class ValidatorActions {
    static VALIDATION_OK = 'validator_validation_ok';
    static VALIDATION_KO = 'validator_validation_ko';

    constructor(Store) {
        this.store = Store;
    }

    validate(validator, value) {
        const validation = validator.validate(value);
        const uuid = validator.uuid;
        const type = validation ? ValidatorActions.VALIDATION_OK : ValidatorActions.VALIDATION_KO;

        const result = {
            type,
            uuid
        };

        this.store.dispatch(result);
    }

    static getInstance() {
        if(!ValidatorActions.instance) ValidatorActions.instance = new ValidatorActions(Store);
        return ValidatorActions.instance;
    }
}

export default ValidatorActions.getInstance();