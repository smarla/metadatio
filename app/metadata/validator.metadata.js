/**
 * Created by sm on 01/05/16.
 */

import ValidatorTypes from './validator-types.metadata';
import {ValidatorException} from '../base/exceptions';

export default class Validator {
    constructor(type, validator) {
        this.type = type;
        this.validator = validator;

        if(!ValidatorTypes[this.type]) {
            throw new ValidatorException('Validator type is wrong');
        }

        if(!validator) {
            throw new ValidatorException('Validator does not have a match to check');
        }

        switch(this.type) {
            case ValidatorTypes.exact:

                break;

            case ValidatorTypes.regex:
                if(!(this.validator instanceof RegExp)) {
                    throw new ValidatorException('Validator for type \'regex\' must be a regular expression');
                }
                break;

            case ValidatorTypes.range:
                if(this.validator.min === undefined && this.validator.max === undefined) {
                    throw new ValidatorException('Validator for type \'range\' must specify at least one of \'min\' and \'max\'')
                }

                if((this.validator.min !== undefined && typeof(this.validator.min) !== 'number') || (this.validator.max !== undefined && typeof(this.validator.max) !== 'number')) {
                    throw new ValidatorException('Options (min, max) for \'range\' validators must be numbers');
                }

                break;

            case ValidatorTypes.length:
                break;

            case ValidatorTypes.fn:
                break;
        }
    }

    validate(value) {
        switch(this.type) {
            case ValidatorTypes.exact:
                return value === this.validator;

            case ValidatorTypes.regex:
                return !!value.match(this.validator);

            case ValidatorTypes.range:
                let rangeMin = this.validator.min ? value >= this.validator.min : true;
                let rangeMax = this.validator.max ? value <= this.validator.max : true;
                return rangeMin && rangeMax;

            case ValidatorTypes.length:
                let lengthMin = this.validator.min ? value.length >= this.validator.min : true;
                let lengthMax = this.validator.max ? value.length <= this.validator.max : true;
                return lengthMin && lengthMax;

            case ValidatorTypes.fn:
                return this.validator.call(this, value);

        }

        return false;
    }
}