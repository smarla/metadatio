/**
 * Created by sm on 14/05/16.
 */

export default class StoreException extends Error {
    constructor(code) {
        super(code);
        this.className = 'StoreException';
        this.code = code;
    }

    static codes = {
        'ST001': 'The store cannot dispatch actions until it\'s configured',
        'ST002': 'The store cannot inject reducers until it\'s configured',

        'STC001': 'The store can only be configured once',

        'STS001': 'The states must be instances of immutable.Map'
    }
}