/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import { combineReducers } from 'redux';

import { Field } from '../../metadata';
import InjectableReducer from './injectable.reducer';
import ValidatorReducer from './validator.reducer';
import { ReducerException } from '../../exceptions';
import FieldActions from '../../actions/field.actions';

/**
 * This reducer is in charge of controlling all actions dispatched to change the validation status for a field.
 *
 * @module Reducers
 * @submodule injectable
 * @class FieldReducer
 * @extends InjectableReducer
 * @constructor
 */
export default class FieldReducer extends InjectableReducer {

    /**
     * Contains the initial state for any Field. Upon construction, this property is filled with the Field data for further control.
     *
     * The basic structure of the `initialState` is:
     *
     * ```
     * {
     *   uuid: 'Unique ID of the validator',
     *   valid: true, // Whether the validation succeeded
     *   validator: Field // The actual validator to match against
     * }
     * ```
     *
     * @property initialState
     * @static
     * @type {Map}
     */
    static initialState = Map({
        uuid: null,
        value: null,
        valid: true
    });

    /**
     * Constructor for the validator reducer
     *
     * @method constructor
     * @param field {Field} The field to associate with the reducer
     */
    constructor(item, field) {
        // TODO Exception management

        super({
            uuid: item.uuid,
            initialState: Map({
                uuid: item.uuid,
                value: null
            })
        });

        this.validators = {};
        for(let validatorName in field.validators) {
            const validator = field.validators[validatorName];
            const uuid = validator.uuid;
            const reducer = new ValidatorReducer(validator);
            this.validators[validatorName] = reducer;
        }
    }

    /**
     * Combines the field information reducer - that handles the data within this reducer - and the inner validation and history reducers.
     *
     * @method combine
     * @returns {Reducer}
     */
    combine() {
        const objValidators = {};
        let hasValidators = false;
        for(let validatorName in this.validators) {
            const validator = this.validators[validatorName];
            objValidators[validatorName] = validator.combine();
            hasValidators = true;
        }

        const combined = {
            info: InjectableReducer.doReduce(this)
        };

        if(hasValidators) {
            combined.validators = combineReducers(objValidators);
        }


        return combineReducers(combined);
    }

    /**
     * Performs a reduction on a validator state, upon a validation change action.
     *
     * @method reduce
     * @param state
     * @param action
     * @returns {Map}
     */
    reduce(state = FieldReducer.initialState, action) {
        switch(action.type) {
            case FieldActions.VALUE_CHANGED:
                return Map({
                    uuid: action.uuid,
                    value: action.value
                });
        }

        return state;
    }
}