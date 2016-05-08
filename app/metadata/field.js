/**
 * Created by sm on 01/05/16.
 */

import Validator from './validator';
import { MetadataIntegrityException, DataValidationException } from './exceptions';
import DataTypes from './data-types';
import * as util from './util';

/**
 * The fields represent each and every property of any entity. Each field is completely sufficient - it stores configuration about the identification, typing and validation of the property - and all {{#crossLink "Entity"}}entity{{/crossLink}} procedures depending on fields dispatch down the action, that it's interpreted isolatedly.
 *
 * ## Usage
 *
 * ```
 * const field = new Field({
 *   name: 'foo',
 *   [label: 'Foo',]
 *   [description: 'description...',]
 *   dataType: 'string',
 *   [multiplicity: 'one',]
 *   [validators: {...}]
 * });
 * ```
 *
 * ## Identification
 *
 * All fields must be defined with a {{#crossLink "Field/name:property"}}name{{/crossLink}}, that must be unique within each entity. In addition, you can define a field's {{#crossLink "Field/label:property"}}label{{/crossLink}} - useful for translatable usages.
 *
 * ## Data typing
 *
 * All fields must have an assigned data type.
 *
 * ### Basic data types
 *
 * You can make use of several basic data types, all available at the {{#crossLink "DataTypes"}}DataTypes{{/crossLink}} specification.
 *
 * ```
 * string: 'Sample value',
 * number: 123[.456],
 * boolean: true|false,
 * date: new Date()|Timestamp
 * ```
 *
 * ### Reference data types
 *
 * You can set a reference to an entity as the data type for a field. This will build a relationship between your field's entity and the target entity, through the field you setup for that.
 *
 * ```
 * const foo = new Entity({ name: 'foo', ... });
 * const field = new Field({ name: 'bar', dataType: foo });
 * ```
 *
 * #### Referenced validations
 *
 * When a field's data type is set as a reference, the validation procedures change for it. Values for the fields with this metadata can be filled either with the whole entity - for inner object saving - or via a `string` or `number` identifying the entity - deep linking approach. In the case you provide complete entities as values, the validation procedures of the target entity's metadata will be applied.
 *
 * @module Core
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
        
        this.label = props.label || null;

        /**
         * Description for the field
         *
         * @property description
         * @type {string}
         * @default null
         */
        this.description = props.description || null;

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
         * @type {string}
         * @default 'one'
         */
        this.multiplicity = props.multiplicity || 'one';

        /**
         * Define the validators for the field
         *
         * @property validators
         * @type {Validator*}
         * @default {}
         */
        this.validators = {};

        // Verify basic metadata
        if(!this.name) throw new MetadataIntegrityException('MIF001');
        if(typeof(this.name) !== 'string') throw new MetadataIntegrityException('MIF002');
        if(!util.NAME_PATTERN_VALIDATOR.validate(this.name)) throw new MetadataIntegrityException('MIF003');
        if(!util.NAME_LENGTHS_VALIDATOR.validate(this.name)) throw new MetadataIntegrityException('MIF004');
        if(!this.dataType) throw new MetadataIntegrityException('MIF005');
        if(!DataTypes[this.dataType]) throw new MetadataIntegrityException('MIF006');
        if(['one', 'many'].indexOf(this.multiplicity) === -1) throw new MetadataIntegrityException('MIF007');

        // Add validators
        for(let validatorName in props.validators) {
            const validator = props.validators[validatorName];

            this.addValidator(validatorName, validator);
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
        // Validate value data type
        const valueType = typeof(value);
        switch(this.dataType) {
            case DataTypes.string:
                if(valueType !== 'string') throw new DataValidationException('Values for data type \'string\' must be strings');
                break;
            case DataTypes.number:
                if(valueType !== 'number') throw new DataValidationException('Values for data type \'number\' must be numbers');
                break;
            case DataTypes.boolean:
                if([true, false].indexOf(value) === -1) throw new DataValidationException('Values for data type \'boolean\' must be either true or false');
                break;
            case DataTypes.date:
                if(valueType !== 'number' && !(value instanceof Date)) throw new DataValidationException('Values for data type \'date\' must be either dates or timestamps');
                break;
        }

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
     * @returns {Field}
     * @chainable
     */
    addValidator(name, validator, overwrite = false) {
        if(!name || typeof(name) !== 'string' || !name.length) {
            throw new MetadataIntegrityException('MIV001');
        }

        if(!(validator instanceof Validator)) {
            throw new MetadataIntegrityException('MIV002');
        }
        
        if(!overwrite && this.validators[name] !== undefined) {
            throw new MetadataIntegrityException('MIV003')
        }

        this.validators[name] = validator;

        return this;
    }
}