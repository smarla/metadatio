/**
 * Created by sm on 01/05/16.
 */

import BaseException from './base.exception';

/**
 * 
 *
 * @module Core
 * @submodule exceptions
 * @class ValidatorException
 * @constructor
 */
export default class ValidatorException extends BaseException {

    /**
     * Constructs a new exception
     *
     * @method constructor
     * @param e
     */
    constructor(code) {
        super(code, ValidatorException.codes[code], { className: 'ValidatorException' });
    }
    
    static codes = {
        'V001': 'Validator type is wrong',
        'V002': 'Validator does not have a match to check',
        'V003': 'Validator of type \'required\' do not need a validator match',
        'V004': 'Validator for type \'exact\' must not be an object',
        'V005': 'Value provided for validator type \'exact\' must not be an object',
        'V006': 'Validator for type \'regex\' must be a regular expression',
        'V007': 'Value provided for validator type \'regex\' must be a string',
        'V008': 'Validator for type \'range\' must specify at least one of \'min\' and \'max\'',
        'V009': 'Options (min, max) for \'range\' validators must be numbers',
        'V010': 'Value provided for validator type \'range\' must be a number',
        'V011': 'Validator for type \'length\' must specify at least one of \'min\' and \'max\'',
        'V012': 'Options (min, max) for \'length\' validators must be numbers',
        'V013': 'Value provided for validator type \'length\' must be either a string or an array',
        'V014': 'Validators of type \'fn\' must receive a function to validate against',
        'V015': 'Validator functions must return either \'true\' or \'false\''
    }
}