/**
 * Created by sm on 15/05/16.
 */

import { Map } from 'immutable';
import { expect } from 'chai';

import { InjectableReducer, ValidatorReducer } from '../../../src/reducers/injectable';
import { ValidatorActions } from '../../../src/actions/validator.actions';
import { Validator, ValidatorTypes } from '../../../src/metadata';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The validator reducer', () => {

    describe('upon construction', () => {
        it('should a parameter as input', (done) => {
            try {
                new ValidatorReducer();
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RIV001');
                done();
            }
        });

        it('should receive an instance of field', (done) => {
            try {
                new ValidatorReducer('wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RIV002');
                done();
            }
        });
    });

    describe('upon reduction', () => {
        let reducer = null;

        beforeEach(() => {
            let validator = new Validator(ValidatorTypes.required);
            reducer = new ValidatorReducer(validator);
        });

        it('should return the same state on any action not interesting for the validator', () => {
            const state = Map({
                uuid: reducer.uuid,
                valid: true
            });

            const nextState = InjectableReducer.doReduce()(state, { type: 'SOME_UNWANTED_ACTION', uuid: reducer.uuid });
            expect(state).to.equal(nextState);
        });

        it('should return the same state on any action with different uuid', () => {
            const state = Map({
                uuid: reducer.uuid,
                valid: true
            });

            const nextState = InjectableReducer.doReduce()(state, { type: ValidatorActions.VALIDATION_OK, uuid: 'abc' });
            expect(state).to.equal(nextState);
        });

        it('should set validity to true when it listens to a VALIDATION_OK action', () => {
            const state = Map({
                uuid: reducer.uuid,
                valid: true
            });

            const nextState = InjectableReducer.doReduce()(state, { type: ValidatorActions.VALIDATION_OK, uuid: reducer.uuid });
            expect(state).to.not.equal(nextState);
            expect(nextState.get('valid')).to.equal(true);
        });

        it('should set validity to false when it listens to a VALIDATION_KO action', () => {
            const state = Map({
                uuid: reducer.uuid,
                valid: true
            });

            const nextState = InjectableReducer.doReduce()(state, { type: ValidatorActions.VALIDATION_KO, uuid: reducer.uuid });
            expect(state).to.not.equal(nextState);
            expect(nextState.get('valid')).to.equal(false);
        });
    });
});