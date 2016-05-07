/**
 * Created by sm on 01/05/16.
 */

import Validator from './validator';
import { MetadataIntegrityException } from '../exceptions';
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
        if(!this.name) throw new MetadataIntegrityException('Field name is required');
        if(typeof(this.name) !== 'string') throw new MetadataIntegrityException('Field name must be a string');
        if(!util.NAME_PATTERN_VALIDATOR.validate(this.name)) throw new MetadataIntegrityException('Field name must comply with the specification');
        if(!util.NAME_LENGTHS_VALIDATOR.validate(this.name)) throw new MetadataIntegrityException('Field name must have between 2 and 64 characters');
        if(!this.dataType) throw new MetadataIntegrityException('Data type is not defined');
        if(!DataTypes[this.dataType]) throw new MetadataIntegrityException('Data type is invalid');
        if(!this.multiplicity) throw new MetadataIntegrityException('Multiplicity is not defined');
        if(['one', 'many'].indexOf(this.multiplicity) === -1) throw new MetadataIntegrityException('Multiplicity is neither \'one\' nor \'many\'');

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
            throw new MetadataIntegrityException('Validator name must be given, and be a string');
        }

        if(!(validator instanceof Validator)) {
            throw new MetadataIntegrityException('Validators must be instances of \'Validator\'');
        }
        
        if(!overwrite && this.validators[name] !== undefined) {
            throw new MetadataIntegrityException('A validator already exists with name' + name + ' and \'overwrite\' flag has not been set')
        }

        this.validators[name] = validator;

        return this;
    }
}