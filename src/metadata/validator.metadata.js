/**
 * Created by sm on 01/05/16.
 */

import Element from './element.metadata';
import ValidatorTypes from './validator-types.metadata';
import {ValidatorException} from '../exceptions';


/**
 *
 * Validators help you define rules with which you will consider the value given for a field as **valid**.
 *
 *
 * @module Core
 * @class Validator
 * @constructor
 *
 */
export default class Validator extends Element {

    /**
     * Creates a new validator instance, for validating using a certain method, with the validator match given
     *
     * @method constructor
     * @param type {string} Define the type of validation to use. Type must be one TODO: Link ValidatorTypes defined.
     * @param validator {string|RegExp|Object|function} The validator to match values against
     */
    constructor(type, validator) {
        super();

        this.validateConfig(type, validator);
        this.type = type;
        this.validator = validator;
    }

    get type() {
        return this.attr('type');
    }

    set type(type) {
        this.attr('type', type);
    }

    get validator() {
        return this.attr('validator');
    }

    set validator(validator) {
        this.attr('validator', validator);
    }

    /**
     * Used to validate a value against the validator defined.
     *
     * @method validate
     * @param value {*} Value to validate
     * @returns {boolean}
     */
    validate(value) {
        if(value === null) return false;
        
        switch(this.type) {
            case ValidatorTypes.required:
                return value !== null && value !== undefined && value !== '';
            case ValidatorTypes.exact:
                if(typeof(value) === 'object') throw new ValidatorException('V005');

                return value === this.validator;

            case ValidatorTypes.regex:
                if(typeof(value) !== 'string') throw new ValidatorException('V007');

                return !!value.match(this.validator);

            case ValidatorTypes.range:
                if(typeof(value) !== 'number') throw new ValidatorException('V010');

                const rangeMin = this.validator.min ? value >= this.validator.min : true;
                const rangeMax = this.validator.max ? value <= this.validator.max : true;
                return rangeMin && rangeMax;

            case ValidatorTypes.length:
                if(typeof(value) !== 'string' && !(value instanceof Array)) throw new ValidatorException('V013');

                const lengthMin = this.validator.min ? value.length >= this.validator.min : true;
                const lengthMax = this.validator.max ? value.length <= this.validator.max : true;
                return lengthMin && lengthMax;

            case ValidatorTypes.fn:
                const value = this.validator.call(this, value);
                if(value !== true && value !== false) throw new ValidatorException('V015');
                
                return value;

        }
    }

    validateConfig(type, validator) {
        if(!ValidatorTypes[type]) throw new ValidatorException('V001');
        if(type !== ValidatorTypes.required && !validator) throw new ValidatorException('V002');
        if(type === ValidatorTypes.required && validator) throw new ValidatorException('V003');

        switch(type) {
            case ValidatorTypes.exact:
                if (typeof(validator) === 'object') throw new ValidatorException('V004');
                break;

            case ValidatorTypes.regex:
                if (!(validator instanceof RegExp)) throw new ValidatorException('V006');
                break;

            case ValidatorTypes.range:
                if (validator.min === undefined && validator.max === undefined) throw new ValidatorException('V008')
                if ((validator.min !== undefined && typeof(validator.min) !== 'number') || (validator.max !== undefined && typeof(validator.max) !== 'number')) {
                    throw new ValidatorException('V009');
                }

                break;
            case ValidatorTypes.length:
                if (validator.min === undefined && validator.max === undefined) throw new ValidatorException('V011')
                if ((validator.min !== undefined && typeof(validator.min) !== 'number') || (validator.max !== undefined && typeof(validator.max) !== 'number')) {
                    throw new ValidatorException('V012');
                }

                break;

            case ValidatorTypes.fn:
                if (typeof(validator) !== 'function') throw new ValidatorException('V014');
                break;
        }
    }
}