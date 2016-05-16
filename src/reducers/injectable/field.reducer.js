/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import InjectableReducer from './injectable.reducer';
import { ReducerException } from '../../exceptions';

import { FieldActions } from '../../actions/field.actions';

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
     * @type {immutable.Map}
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
     * @param uuid {string} Unique ID for the validator
     * @param validator {Field} The validator that performs the validation
     */
    constructor(uuid, validator) {
        super({
            uuid: uuid,
            initialState: FieldReducer.initialState
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
    reduce(state = FieldReducer.initialState, action) {
        if(!state) throw new ReducerException('RI003');
        if(!(state instanceof Map)) throw new ReducerException('RI004');
        if(!action) throw new ReducerException('RI005');
        if(typeof(action) !== 'object') throw new ReducerException('RI006');
        if(!action.type) throw new ReducerException('RI007');
        if(typeof(action.type) !== 'string') throw new ReducerException('RI008');
        if(!action.uuid) throw new ReducerException('RI009');

        if(action.uuid !== state.get('uuid')) return state;

        // TODO Save history
        switch(action.type) {
            case FieldActions.VALIDATION_OK:
                return Map({
                    uuid: action.uuid,
                    valid: true
                });
            case FieldActions.VALIDATION_KO:
                return Map({
                    uuid: action.uuid,
                    valid: false
                });
        }

        return state;
    }
}