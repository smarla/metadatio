/**
 * Created by sm on 21/05/16.
 */

import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import { Validator, ValidatorTypes } from '../../src/metadata';
import { ValidatorActions } from '../../src/actions/validator.actions';

const mockStore = configureStore();

describe.only('The validator actions', () => {
    let store = null;
    let validator = null;
    let actions = null;
    beforeEach(() => {
        store = mockStore({});
        validator = new Validator(ValidatorTypes.regex, /^123$/);
        actions = new ValidatorActions(store);
    });

    it('should dispatch VALIDATION_OK action if validation matches', () => {
        actions.validate(validator, '123');
        expect(store.getActions()).to.deep.equal([{
            type: ValidatorActions.VALIDATION_OK,
            uuid: validator.uuid
        }])
    });

    it('should dispatch VALIDATION_KO action if validation does not match', () => {
        actions.validate(validator, 'abc');
        expect(store.getActions()).to.deep.equal([{
            type: ValidatorActions.VALIDATION_KO,
            uuid: validator.uuid
        }])
    });

});