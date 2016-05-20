/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';

import { Validator } from '../../metadata';
import InjectableReducer from './injectable.reducer';
import { ValidatorActions } from '../../actions/validator.actions';
import { ReducerException } from '../../exceptions';

/**
 * This reducer is in charge of controlling all actions dispatched to change the validation status for a field.
 *
 * @module Reducers
 * @submodule injectable
 * @class ValidatorReducer
 * @extends InjectableReducer
 * @constructor
 */
export default class ValidatorReducer extends InjectableReducer {

    /**
     * Contains the initial state for any Validator. Upon construction, this property is filled with the Validator data for further control.
     *
     * The basic structure of the `initialState` is:
     *
     * ```
     * {
     *   uuid: 'Unique ID of the validator',
     *   valid: true, // Whether the validation succeeded
     * }
     * ```
     *
     * @property initialState
     * @static
     * @type {immutable.Map}
     */
    static initialState = Map({
        uuid: null,
        valid: true
    });

    /**
     * Constructor for the validator reducer
     *
     * @method constructor
     * @param validator {Validator} The validator that will perform changes on this state
     * @param [valid=null] {Boolean} If you want to provide an initial validity for the validator
     */
    constructor(validator, valid) {
        if(!validator) throw new ReducerException('RIV001');
        if(!(validator instanceof Validator)) throw new ReducerException('RIV002');

        super({
            uuid: validator.uuid,
            initialState: Map({
                uuid: validator.uuid,
                valid: valid
            })
        });
    }

    /**
     * Performs a reduction on a validator state, upon a validation change action.
     *
     * @method reduce
     * @param state
     * @param action
     * @returns {immutable.Map}
     */
    reduce(state = ValidatorReducer.initialState, action) {
        switch(action.type) {
            case ValidatorActions.VALIDATION_OK:
                return Map({
                    uuid: action.uuid,
                    valid: true
                });
            case ValidatorActions.VALIDATION_KO:
                return Map({
                    uuid: action.uuid,
                    valid: false
                });
        }

        return state;
    }
}