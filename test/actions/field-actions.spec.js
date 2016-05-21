/**
 * Created by sm on 21/05/16.
 */

import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import { Field, DataTypes, Validator, ValidatorTypes } from '../../src/metadata';
import FieldActions from '../../src/actions/field.actions';
import ValidatorActions from '../../src/actions/validator.actions';


const mockStore = configureStore();

describe('The field actions', () => {
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

    it('should dispatch VALUE_CHANGED and one validation action for a field with one validator', () => {
        const field = new Field({
            name: 'test',
            dataType: DataTypes.string,
            validators: {
                pattern: new Validator(ValidatorTypes.regex, /^123$/)
            }
        });

        const store = mockStore({});
        const actions = new FieldActions(store);
        actions.update(field, '123');

        expect(store.getActions()).to.deep.equal([{
            type: FieldActions.VALUE_CHANGED,
            uuid: field.uuid,
            value: '123'
        }, {
            type: ValidatorActions.VALIDATION_OK,
            uuid: field.validators.pattern.uuid
        }]);
    });

    it('should dispatch VALUE_CHANGED and two validation actions for a field with two validators', () => {
        const field = new Field({
            name: 'test',
            dataType: DataTypes.string,
            validators: {
                pattern: new Validator(ValidatorTypes.regex, /^123$/),
                lengths: new Validator(ValidatorTypes.length, { min: 5 })
            }
        });

        const store = mockStore({});
        const actions = new FieldActions(store);
        actions.update(field, '123');

        expect(store.getActions()).to.deep.equal([{
            type: FieldActions.VALUE_CHANGED,
            uuid: field.uuid,
            value: '123'
        }, {
            type: ValidatorActions.VALIDATION_OK,
            uuid: field.validators.pattern.uuid
        }, {
            type: ValidatorActions.VALIDATION_KO,
            uuid: field.validators.lengths.uuid
        }]);
    });
})