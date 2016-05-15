/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import InjectableReducer from './injectable.reducer';
import { ReducerException } from '../../exceptions';
import { Validator } from '../../metadata';

import { ValidatorActions } from '../../actions/validator.actions';

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
     *   validator: Validator // The actual validator to match against
     * }
     * ```
     *
     * @property initialState
     * @static
     * @type {immutable.Map}
     */
    static initialState = Map({
        uuid: null,
        valid: true,
        validated_at: null
    });

    /**
     * Constructor for the validator reducer
     *
     * @method constructor
     * @param uuid {string} Unique ID for the validator
     * @param validator {Validator} The validator that performs the validation
     */
    constructor(uuid, validator) {
        super({
            uuid: uuid,
            initialState: ValidatorReducer.initialState
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
        if(!state) throw new ReducerException('RIV003');
        if(!(state instanceof Map)) throw new ReducerException('RIV004');
        if(!action) throw new ReducerException('RIV005');
        if(typeof(action) !== 'object') throw new ReducerException('RIV006');
        if(!action.type) throw new ReducerException('RIV007');
        if(typeof(action.type) !== 'string') throw new ReducerException('RIV008');
        if(!action.uuid) throw new ReducerException('RIV009');

        if(action.uuid !== state.get('uuid')) return state;

        // TODO Save history
        switch(action.type) {
            case ValidatorActions.VALIDATION_OK:
                return Map({
                    uuid: action.uuid,
                    valid: true
                });
                break;
            case ValidatorActions.VALIDATION_KO:
                return Map({
                    uuid: action.uuid,
                    valid: false
                });
                break;
        }

        return state;
    }
}