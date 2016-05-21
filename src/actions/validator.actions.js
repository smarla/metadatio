/**
 * Created by sm on 14/05/16.
 */

export default class ValidatorActions {
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
}