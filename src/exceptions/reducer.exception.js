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
        'RBI004': 'All injectable reducers must have an initial state'
    };
}