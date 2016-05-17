/**
 * Created by sm on 14/05/16.
 */

/**
 * Defines an exception thrown within the Reducer system. Whenever some reduction process fails, you will get this exception. There are several reasons for which you could get a `ReducerException`.
 *
 * @module Core
 * @submodule exceptions
 * @class ReducerException
 * @extends Error
 */
export default class ReducerException extends Error {
    constructor(code) {
        super(code);
        this.code = code;
        this.className = 'ReducerException';
    }

    static codes = {

        /**
         * ### Base Injectable reducer needs an object to be configured
         *
         * In order to create an {{#crossLink InjectableReducer}}Injectable reducer{{/crossLink}}, you need to provide an object defining the injectable
         *
         * @example
         *     new InjectableReducer()
         *
         * @attribute RBI001
         */
        'RBI001': 'Base Injectable reducer needs an object to be configured',

        /**
         * ### Base Injectable reducer cannot be configured with a non-object
         *
         * {{#crossLink InjectableReducer}}Injectable reducers{{/crossLink}} must receive an instance of object
         *
         * @example
         *     new InjectableReducer('wrong')
         *
         * @attribute RBI002
         */
        'RBI002': 'Base Injectable reducer cannot be configured with a non-object',

        /**
         * ### You need to provide a UUID to create an injectable resource
         *
         * There could be many reducers for the same purpose, so an **uuid** is needed to identify the target of our actions - all actions targeted to an {{#crossLink InjectableReducer}}injectable{{/crossLink}} **must** have an uuid present too.
         *
         * Metadatio uses {{#crossLink https://www.npmjs.com/package/shortid}}shortid{{/crossLink}} library for generating short ids.
         *
         * @example
         *     new InjectableResource({});
         *
         * @attribute RBI003
         */
        'RBI003': 'You need to provide a UUID to create an injectable resource',

        /**
         * ### All injectable reducers must have an initial state
         *
         * You need to provide an initial state for the injectable reducer upon creation
         *
         * @example
         *     new InjectableResource({ uuid: 'xyz' });
         *
         * @attribute RBI004
         */
        'RBI004': 'All injectable reducers must have an initial state',

        /**
         * ### Every reducer needs a state object when reducing
         *
         * This exception occurs upon reduction, whenever a reducer is called without a given state. If you've configured {{#crossLink http://redux.js.org/}}Redux{{/crossLink}} you shouldn't get this error - as it will be Redux the one who calls your reducer, and it will **always** send a `state`.
         *
         * @attribute RI003
         */
        'RI003': 'Every reducer needs a state object when reducing',

        /**
         * ### All states must be instances of Map
         *
         * All native reducers within Metadatio work specifically with {{#crossLink https://www.npmjs.com/package/immutable}}Immutable{{/crossLink}} maps. If you try to set a state as a non-map instance, you will get this error.
         *
         * @attribute RI004
         */
        'RI004': 'All states must be instances of Map',

        /**
         * ### Every reducer needs an action to reduce
         *
         * This error occurs when a reducer is called without an action.
         *
         * @attribute RI005
         */
        'RI005': 'Every reducer needs an action to reduce',

        /**
         * ### The action to reduce must be an object
         *
         * All actions sent to the reducer must be objects
         *
         * @attribute RI006
         */
        'RI006': 'The action to reduce must be an object',

        /**
         * ### All actions must contain a 'type' attribute
         *
         * Actions are defined via a `type` attribute. So this parameter is needed, as otherwise the action will not have any identity for the reducer.
         *
         * @attribute RI007
         */
        'RI007': 'All actions must contain a \'type\' attribute',

        /**
         * ### Action type sent to reducer must be a string
         *
         * The `type` attribute must be a String
         *
         * @example
         *     reducer.reduce(state, { type: 123 })
         *
         * @attribute RI008
         */
        'RI008': 'Action type sent to reducer must be a string',

        /**
         * ### All actions must contain a \'uuid\' attribute
         *
         * Every action that arrives at an injectable reducer needs to be targeted with a uuid. As these reducers are not unique, otherwise your action could trigger an unwanted behavior.
         *
         * @attribute RI009
         */
        'RI009': 'All actions must contain a \'uuid\' attribute',

        /**
         * ### Entity reducer needs an entity as input
         * 
         * 
         *
         * @attribute RIE001
         */
        'RIE001': 'Entity reducer needs an entity as input',

        /**
         * ### Entity reducer needs an instance of Entity
         *
         * @attribute RIE002
         */
        'RIE002': 'Entity reducer needs an instance of Entity',

        /**
         * ### Field reducer needs a field as input
         *
         * @attribute RIF001
         */
        'RIF001': 'Field reducer needs a field as input',

        /**
         * ### Field reducer needs an instance of Field
         *
         * @attribute RIF002
         */
        'RIF002': 'Field reducer needs an instance of Field',

        /**
         * ### Validator reducer needs a validator as input
         *
         * @attribute RIV001
         */
        'RIV001': 'Validator reducer needs a validator as input',

        /**
         * ### Validator reducer needs an instance of Validator
         *
         * @attribute RIV002
         */
        'RIV002': 'Validator reducer needs an instance of Validator'
    };
}