/**
 * Created by sm on 15/05/16.
 */

import { Map } from 'immutable';
import { expect } from 'chai';

import { ValidatorReducer } from '../../../src/reducers/injectable';
import { ValidatorActions } from '../../../src/actions/validator.actions';

describe('The validator reducer', () => {
    let reducer = null;

    beforeEach(() => {
        reducer = new ValidatorReducer('uuid');
    });

    it('should return the same state on any action not interesting for the validator', () => {
        const state = Map({
            uuid: '123',
            valid: true
        });

        const nextState = reducer.reduce(state, { type: 'SOME_UNWANTED_ACTION', uuid: '123' });
        expect(state).to.equal(nextState);
    });

    it('should return the same state on any action with different uuid', () => {
        const state = Map({
            uuid: '123',
            valid: true
        });

        const nextState = reducer.reduce(state, { type: ValidatorActions.VALIDATION_OK, uuid: 'abc' });
        expect(state).to.equal(nextState);
    });

    it('should set validity to true when it listens to a VALIDATION_OK action', () => {
        const state = Map({
            uuid: '123',
            valid: true
        });

        const nextState = reducer.reduce(state, { type: ValidatorActions.VALIDATION_OK, uuid: '123' });
        expect(state).to.not.equal(nextState);
        expect(nextState.get('valid')).to.equal(true);
    });

    it('should set validity to false when it listens to a VALIDATION_KO action', () => {
        const state = Map({
            uuid: '123',
            valid: true
        });

        const nextState = reducer.reduce(state, { type: ValidatorActions.VALIDATION_KO, uuid: '123' });
        expect(state).to.not.equal(nextState);
        expect(nextState.get('valid')).to.equal(false);
    });
});