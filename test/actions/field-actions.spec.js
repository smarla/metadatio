/**
 * Created by sm on 21/05/16.
 */

import {expect} from 'chai';
import configureStore from 'redux-mock-store';

import {Field, DataTypes, Validator, ValidatorTypes} from '../../src/metadata';
import FieldActions from '../../src/actions/field.actions';
import ValidatorActions from '../../src/actions/validator.actions';


const mockStore = configureStore();
const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The field actions', () => {
    describe('for updating values', () => {
        it('should verify that a field is sent', (done) => {
            const store = mockStore({});
            const actions = new FieldActions(store);
            try {
                actions.update();
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF001');
                done();
            }
        });

        it('should verify that the field is an instance of field', (done) => {
            const store = mockStore({});
            const actions = new FieldActions(store);
            try {
                actions.update('wrong');
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF002');
                done();
            }
        });

        it('should verify that the value is not undefined', (done) => {
            const field = new Field({
                name: 'test',
                dataType: DataTypes.string
            });

            const store = mockStore({});
            const actions = new FieldActions(store);
            try {
                actions.update(field);
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF003');
                done();
            }
        });

        it('should dispatch VALUE_CHANGED action when value is first set', () => {
            const field = new Field({
                name: 'test',
                dataType: DataTypes.string
            });

            const store = mockStore({});
            const actions = new FieldActions(store);
            actions.update(field, '123');

            expect(store.getActions()).to.deep.equal([{
                type: FieldActions.VALUE_CHANGED,
                uuid: field.uuid,
                value: '123'
            }])
        });
    });

    describe('for resetting values', () => {
        it('should verify that a field is sent', (done) => {
            const store = mockStore({});
            const actions = new FieldActions(store);
            try {
                actions.clear();
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF004');
                done();
            }
        });

        it('should verify that the field is an instance of field', (done) => {
            const store = mockStore({});
            const actions = new FieldActions(store);
            try {
                actions.clear('wrong');
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF005');
                done();
            }
        });

        it('should dispatch VALUE_CLEARED for a field', () => {
            const field = new Field({
                name: 'test',
                dataType: DataTypes.string
            });

            const store = mockStore({});
            const actions = new FieldActions(store);
            actions.clear(field);

            expect(store.getActions()).to.deep.equal([{
                type: FieldActions.VALUE_CLEARED,
                uuid: field.uuid
            }]);
        });
    });
});