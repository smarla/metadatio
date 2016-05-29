/**
 * Created by sm on 01/05/16.
 */

/**
 * This exception is thrown whenever there is an error while validating your data.
 *
 * @module Core
 * @submodule exceptions
 * @class DataValidationException
 * @extends Error
 */
export default class DataValidationException extends Error {
    constructor(e) {
        super(e);
        this.className = 'DataValidationException';
        this.code = e;
    }

    static codes = {
        'DV001': 'Field value is undefined',
        'DV002': 'Values for data type \'string\' must be strings',
        'DV003': 'Values for data type \'number\' must be numbers',
        'DV004': 'Values for data type \'boolean\' must be either true or false',
        'DV005': 'Values for data type \'date\' must be either dates or timestamps',

        'DVI001': 'Entity validation needs an Item as input',
        'DVI002': 'The object sent for Entity validation must be an instance of Item'
    };
}