/**
 * Created by sm on 15/05/16.
 */

import { Map } from 'immutable';
import { expect } from 'chai';

import { DataTypes, Field, Validator, ValidatorTypes } from '../../../src/metadata';
import { FieldReducer, ValidatorReducer } from '../../../src/reducers/injectable';
import { FieldActions } from '../../../src/actions/field.actions';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The field reducer', () => {

    describe('upon construction', () => {
        it('should a parameter as input', (done) => {
            try {
                new FieldReducer();
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RIF001');
                done();
            }
        });

        it('should receive an instance of field', (done) => {
            try {
                new FieldReducer('wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RIF002');
                done();
            }
        });

        describe('for engaging validation', () => {

            it('should create one validator reducer instances for fields with one validator', () => {
                const field = new Field({
                    name: "name",
                    label: "Name of your app",
                    shortLabel: null,
                    hint: null,
                    dataType: DataTypes.string,
                    multiplicity: 'one',
                    validators: {
                        pattern: new Validator(ValidatorTypes.regex, /^123$/)
                    }
                });

                const reducer = new FieldReducer(field);
                expect(reducer.validators.pattern).to.be.an.instanceof(ValidatorReducer);
            });

            it('should create two validator reducer instances for fields with two validators', () => {
                const field = new Field({
                    name: "name",
                    label: "Name of your app",
                    shortLabel: null,
                    hint: null,
                    dataType: DataTypes.string,
                    multiplicity: 'one',
                    validators: {
                        pattern: new Validator(ValidatorTypes.regex, /^123$/),
                        lengths: new Validator(ValidatorTypes.length, { min: 1, max: 4 })
                    }
                });

                const reducer = new FieldReducer(field);
                expect(reducer.validators.pattern).to.be.an.instanceof(ValidatorReducer);
                expect(reducer.validators.lengths).to.be.an.instanceof(ValidatorReducer);
            });
        });
    });

    describe('upon reduction', () => {
        let reducer = null;
        let field = null;

        beforeEach(() => {
            field = new Field({
                name: "name",
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string,
                multiplicity: 'one',
                validators: {
                    pattern: new Validator(ValidatorTypes.regex, /^123$/)
                }
            });

            reducer = new FieldReducer(field);
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
});