/**
 * Created by sm on 15/05/16.
 */

import { Map } from 'immutable';
import { expect } from 'chai';

import { ValidatorReducer } from '../../../src/reducers/injectable';
import { Validator, ValidatorTypes } from '../../../src/metadata';
import { ValidatorActions } from '../../../src/actions/validator.actions';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The validator reducer', () => {
    let reducer = null;
    let validator = null;
    
    beforeEach(() => {
        validator = new Validator(ValidatorTypes.required);
        reducer = new ValidatorReducer('uuid', validator);
    });

    it('should verify that a state object is given', (done) => {
        try {
            reducer.reduce(null);
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ReducerException');
            expect(e.code).to.equal('RIV003')
            done();
        }
    });

    it('should verify that the state object is an immutable Map', (done) => {
        try {
            reducer.reduce('wrong');
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ReducerException');
            expect(e.code).to.equal('RIV004')
            done();
        }
    });

    it('should receive an action to process', (done) => {
        try {
            reducer.reduce();
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ReducerException');
            expect(e.code).to.equal('RIV005')
            done();
        }
    });

    it('should receive an object as action', (done) => {
        try {
            reducer.reduce(undefined, 'wrong');
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ReducerException');
            expect(e.code).to.equal('RIV006')
            done();
        }
    });

    it('should receive an action with a \'type\' defined', (done) => {
        try {
            reducer.reduce(undefined, {});
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ReducerException');
            expect(e.code).to.equal('RIV007')
            done();
        }
    });

    it('should receive a string as action type', (done) => {
        try {
            reducer.reduce(undefined, { type: 123 });
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ReducerException');
            expect(e.code).to.equal('RIV008')
            done();
        }
    });

    it('should receive an action with a \'uuid\' defined', (done) => {
        try {
            reducer.reduce(undefined, { type: 'SOME_ACTION' });
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ReducerException');
            expect(e.code).to.equal('RIV009')
            done();
        }
    });

    it('should return the same state on any action not interesting for the validator', () => {
        const state = Map({
            uuid: '123',
            valid: true,
            validator
        });

        const nextState = reducer.reduce(state, { type: 'SOME_UNWANTED_ACTION', uuid: '123' });
        expect(state).to.equal(nextState);
    });

    it('should return the same state on any action with different uuid', () => {
        const state = Map({
            uuid: '123',
            valid: true,
            validator
        });

        const nextState = reducer.reduce(state, { type: ValidatorActions.VALIDATION_OK, uuid: 'abc' });
        expect(state).to.equal(nextState);
    });

    it('should mutate when it listens to an interesting action', () => {
        const state = Map({
            uuid: '123',
            valid: true,
            validator
        });

        const nextState = reducer.reduce(state, { type: ValidatorActions.VALIDATION_OK, uuid: '123' });
        expect(state).to.not.equal(nextState);
    });
});