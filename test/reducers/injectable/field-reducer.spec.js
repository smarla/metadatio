/**
 * Created by sm on 15/05/16.
 */

import { Map } from 'immutable';
import { expect } from 'chai';

import { FieldReducer } from '../../../src/reducers/injectable';
import { FieldActions } from '../../../src/actions/field.actions';

describe('The field reducer', () => {
    let reducer = null;

    beforeEach(() => {
        reducer = new FieldReducer('uuid');
    });

    it('should return the same state on any action not interesting for the validator', () => {
        const state = Map({
            uuid: '123',
            valid: true,
            value: 'abc'
        });

        const nextState = reducer.reduce(state, { type: 'SOME_UNWANTED_ACTION', uuid: '123' });
        expect(state).to.equal(nextState);
    });

    it('should return the same state on any action with different uuid', () => {
        const state = Map({
            uuid: '123',
            valid: true,
            value: 'abc'
        });

        const nextState = reducer.reduce(state, { type: FieldActions.VALUE_CHANGED, uuid: 'abc' });
        expect(state).to.equal(nextState);
    });

    it('should set validity to true when it listens to a VALUE_CHANGED action', () => {
        const state = Map({
            uuid: '123',
            valid: true,
            value: 'abc'
        });

        const nextState = reducer.reduce(state, { type: FieldActions.VALUE_CHANGED, uuid: '123', value: 'bcd' });
        expect(state).to.not.equal(nextState);
        expect(nextState.get('value')).to.equal('bcd');
    });

    it('should set validity to false when it listens to a VALIDATION_CHANGED action', () => {
        const state = Map({
            uuid: '123',
            valid: true,
            value: 'abc'
        });

        const nextState = reducer.reduce(state, { type: FieldActions.VALIDATION_CHANGED, uuid: '123', valid: false });
        expect(state).to.not.equal(nextState);
        expect(nextState.get('valid')).to.equal(false);
    });
});