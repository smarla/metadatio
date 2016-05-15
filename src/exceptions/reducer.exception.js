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

        'RIV001': 'Validator reducer needs to receive a validator that performs the actions',
        'RIV002': 'Validator declared for the Validator reducer needs to be a validator',
        'RIV003': 'Validator reducer needs a state object when reducing',
        'RIV004': 'Validator states must be instances of Map',
        'RIV005': 'Validator reducer needs an action to reduce',
        'RIV006': 'The action to reduce must be an object',
        'RIV007': 'All actions must contain a \'type\' attribute',
        'RIV008': 'Action type sent to reducer must be a string',
        'RIV009': 'All actions must contain a \'uuid\' attribute'
    };
}