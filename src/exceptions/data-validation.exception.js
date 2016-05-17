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
    }
}