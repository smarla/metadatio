/**
 * Created by sm on 01/05/16.
 */

import Validator from './validator.metadata';
import { MetadataIntegrityException } from '../exceptions';
import DataTypes from './data-types.metadata';

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
}