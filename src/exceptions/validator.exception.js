/**
 * Created by sm on 01/05/16.
 */

/**
 * 
 *
 * @module Core
 * @submodule exceptions
 * @class ValidatorException
 * @constructor
 */
export default class ValidatorException extends Error {

    /**
     * Constructs a new exception
     *
     * @method constructor
     * @param e
     */
    constructor(e) {
        super(e);
        this.className = 'ValidatorException';
    }
}