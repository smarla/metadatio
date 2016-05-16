/**
 * Created by sm on 14/05/16.
 */

export class ValidatorActions {
    static VALIDATION_OK = 'validator_validation_ok';
    static VALIDATION_KO = 'validator_validation_ko';

    constructor() {

    }

    validate(uuid, value) {

    }

    static getInstance() {
        if(!ValidatorActions.instance) ValidatorActions.instance = new ValidatorActions();
        return ValidatorActions.instance;
    }
}

export default ValidatorActions.getInstance();