/**
 * Created by sm on 14/05/16.
 */

export default class ReducerException extends Error {
    constructor(code) {
        super(code);
        this.code = code;
        this.className = 'ReducerException';
    }

    static codes = {
        'RBI001': 'Base Injectable reducer needs an object to be configured',
        'RBI002': 'Base Injectable reducer cannot be configured with a non-object',
        'RBI003': 'You need to provide a UUID to create an injectable resource',
        'RBI004': 'All injectable reducers must have an initial state',

        'RI003': 'Every reducer needs a state object when reducing',
        'RI004': 'All states must be instances of Map',
        'RI005': 'Every reducer needs an action to reduce',
        'RI006': 'The action to reduce must be an object',
        'RI007': 'All actions must contain a \'type\' attribute',
        'RI008': 'Action type sent to reducer must be a string',
        'RI009': 'All actions must contain a \'uuid\' attribute',

        'RIE001': 'Entity reducer needs an entity as input',
        'RIE002': 'Entity reducer needs an instance of Entity',

        'RIF001': 'Field reducer needs a field as input',
        'RIF002': 'Field reducer needs an instance of Field',

        'RIV001': 'Validator reducer needs a validator as input',
        'RIV002': 'Validator reducer needs an instance of Validator'
    };
}