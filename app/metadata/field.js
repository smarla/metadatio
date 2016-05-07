/**
 * Created by sm on 01/05/16.
 */

import Validator from './validator';
import { MetadataIntegrityException } from '../exceptions';
import DataTypes from './data-types';

/**
 * Defines a field of any entity
 *
 * @module metadata
 * @class Field
 * @constructor
 */
export default class Field {

    /**
     * Constructor for the class
     *
     * @method constructor
     * @param props {Object} An object with the properties of the field
     * @throws {MetadataIntegrityException} If the field's metadata is corrupt in any way, an exception is thrown.
     */
    constructor(props) {

        /**
         * The **name** for the field. A field's name **must** be unique within each entity.
         *
         * @property name
         * @type {string}
         */
        this.name = props.name;

        /**
         * Label for the field. This defines the human-readable name for the field.
         *
         * @property label
         * @type {string}
         */
        this.label = props.label;

        /**
         * Textual aid for any user who wants to define a value for this field
         *
         * @property hint
         * @type {null|string}
         */
        this.hint = props.hint;

        /**
         * Description for the field
         *
         * @property description
         * @type {null|string}
         */
        this.description = props.description;

        /**
         * Define the data type of the element.
         *
         * Basic data types are primitive types to define basic data.
         *
         * @property dataType
         * @type {string|Entity}
         */
        this.dataType = props.dataType;

        /**
         * Define the multiplicity for the element
         *
         * @property multiplicity
         * @type {string|string|*}
         */
        this.multiplicity = props.multiplicity;

        /**
         * Define the validators for the field
         *
         * @property validators
         * @type {Object}
         * @default {}
         */
        this.validators = props.validators || {};

        // Verify basic metadata
        // TODO: Verify lengths etc...
        if(!this.name) throw new MetadataIntegrityException('Field name is required');
        if(!this.dataType) throw new MetadataIntegrityException('Data type is not defined');
        if(!DataTypes[this.dataType]) throw new MetadataIntegrityException('Data type is invalid');
        if(!this.multiplicity) throw new MetadataIntegrityException('Multiplicity is not defined');
        if(['one', 'many'].indexOf(this.multiplicity) === -1) throw new MetadataIntegrityException('Multiplicity is neither \'one\' nor \'many\'');

        // Verify that validators are Validator instances
        // If that's the case, all validation there must have been done already
        for(let validatorName in this.validators) {
            const validator = this.validators[validatorName];

            if(!(validator instanceof Validator)) {
                throw new MetadataIntegrityException('Validators must be instances of \'Validator\'');
            }
        }
    }

    /**
     * Determines whether the value defined for a field is valid.
     *
     * @method validate
     * @param value
     * @param {validators=this.validators} The validators to match against.
     * @returns {boolean}
     */
    validate(value, validators = this.validators) {
        for(let validatorName in validators) {
            const validator = validators[validatorName];

            const validates = validator.validate(value);

            if(!validates) {
                // TODO Create different validation strategies
                // BREAK, COMPLETE, THROW [...]
                return false;
            }

        }

        return true;
    }

    /**
     * Adds a new validator to the field.
     *
     * @method addValidator
     * @param name {string} The name of the validator
     * @param validator {Validator} The new validator to include
     * @param [overwrite=false] {boolean} Whether to overwrite the validator name, if it exists.
     */
    addValidator(name, validator, overwrite = false) {
        if(!name || typeof(name) !== 'string' || !name.length) {
            throw new MetadataIntegrityException('Validator name must be given, and be a string');
        }

        if(!(validator instanceof Validator)) {
            throw new MetadataIntegrityException('Validators must be instances of \'Validator\'');
        }
        
        if(!overwrite && this.validators[name] !== undefined) {
            throw new MetadataIntegrityException('A validator already exists with name' + name + ' and \'overwrite\' flag has not been set')
        }

        this.validators[name] = validator;
    }
}