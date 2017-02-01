/**
 * Created by sm on 14/05/16.
 */
import BaseException from './base.exception';

export default class StoreException extends BaseException {
    constructor(code) {
        super(code, StoreException.codes[code], { className: 'StoreException' });
    }

    static codes = {
        'ST001': 'The store cannot dispatch actions until it\'s configured',
        'ST002': 'The store cannot inject reducers until it\'s configured',
        'ST003': 'The store does not have a state until it\'s configured',

        'STC001': 'The store can only be configured once',

        'STD001': 'Actions sent to dispatch must be objects',
        'STD002': 'Actions sent to dispatch must have a \'type\' attribute',
        'STD003': 'Action type must be a string',

        'STI001': 'All injected reducers must have a name defined',
        'STI002': 'Reducer names must be strings',
        'STI003': 'A reducer must be provided for injection',
        'STI004': 'Reducers must be plain functions',
        'STI005': 'There is already a reducer with name {{name}}',

        'STS001': 'The states must be instances of immutable.Map'
    }
}