/**
 * Created by sm on 01/05/16.
 */
import Element from './element.metadata';
import Entity from './entity.metadata';
import Validator from './validator.metadata';
import { MetadataIntegrityException, DataValidationException } from '../exceptions';
import DataTypes from './data-types.metadata';
import * as util from './util.metadata';

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

export default class Field extends Element {

    /**
     * Constructor for the class
     *
     * @method constructor
     * @param props {Object} An object with the properties of the field
     * @throws {MetadataIntegrityException} If the field's metadata is corrupt in any way, an exception is thrown.
     */
    constructor(props) {
        super();
        this.name = props.name;
        this.label = props.label || null;
        this.shortLabel = props.shortLabel || null;
        this.hint = props.hint || null;
        this.description = props.description || null;
        this.dataType = props.dataType;
        this.multiplicity = props.multiplicity || 'one';
        this.validators = props.validators || {};
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
        if(value === undefined) throw new DataValidationException('DV001');

        if(value !== null) {
            // Validate value data type
            const valueType = typeof(value);
            switch(this.dataType) {
                case DataTypes.string:
                    if(valueType !== 'string') throw new DataValidationException('DV002');
                    break;
                case DataTypes.number:
                    if(valueType !== 'number') throw new DataValidationException('DV003');
                    break;
                case DataTypes.boolean:
                    if([true, false].indexOf(value) === -1) throw new DataValidationException('DV004');
                    break;
                case DataTypes.date:
                    if(valueType !== 'number' && !(value instanceof Date)) throw new DataValidationException('DV005');
                    break;
            }

            const referenceField = !DataTypes[this.dataType];
            if(referenceField) {
                if('many' === this.multiplicity) {
                    // TODO perform global array validations

                    for(let multiItemIndex = 0; multiItemIndex < value.length; multiItemIndex++) {
                        const multiValue = value[multiItemIndex];
                        const validation = this.dataType.validate(multiValue);
                        if(!validation) return false;
                    }
                }
                else {
                    if(!this.dataType.validate(value)) return false;
                }
            }
        }

        for(let validatorName in validators) {
            const validator = validators[validatorName];

            let validates = true;
            if('many' === this.multiplicity && validator.target === 'unit') {
                if(!(value instanceof Array)) {
                    // TODO Throw some nice exception here.
                }
                for(let valueIndex = 0; valueIndex < value.length; valueIndex++) {
                    const valueItem = value[valueIndex];
                    if(!validator.validate(valueItem)) return false;
                }
            }
            else {
                if(!validator.validate(value)) {
                    return false;
                }
            }

            if(!validates) {
                // TODO Create different validation strategies
                // BREAK, COMPLETE, THROW [...]
                return false;
            }

        }

        return true;
    }

    /**
     * The **name** for the field. A field's name **must** be unique within each entity.
     *
     * @property name
     * @type {string}
     */
    get name() {
        return this.attr('name');
    }

    /**
     * @param name
     * @type {string}
     */
    set name(name) {
        if(!name) throw new MetadataIntegrityException('MIF001');
        if(typeof(name) !== 'string') throw new MetadataIntegrityException('MIF002');
        if(!util.NAME_PATTERN_VALIDATOR.validate(name)) throw new MetadataIntegrityException('MIF003');
        if(!util.NAME_LENGTHS_VALIDATOR.validate(name)) throw new MetadataIntegrityException('MIF004');
        this.attr('name', name);
    }

    /**
     * Label for the field. This defines the human-readable name for the field.
     *
     * @property label
     * @type {string}
     */
    get label() {
        return this.attr('label');
    }

    /**
     * @param label
     * @type {string}
     */
    set label(label) {
        this.attr('label', label);
    }

    /**
     * Short label for the field. This defines the short version of the human-readable name for the field.
     *
     * @property shortLabel
     * @type {string}
     */
    get shortLabel() {
        return this.attr('shortLabel');
    }

    /**
     * @param shortlabel
     * @type {string}
     */
    set shortLabel(shortLabel) {
        this.attr('shortLabel', shortLabel);
    }

    /**
     *
     * @property hint
     * @type {string}
     */
    get hint() {
        return this.attr('hint');
    }

    /**
     * @param hint
     * @type {string}
     */
    set hint(hint) {
        this.attr('hint', hint);
    }

    /**
     * Description for the field
     *
     * @property description
     * @type {string}
     * @default null
     */
    get description() {
        return this.attr('description');
    }

    /**
     * @param description
     * @type {string}
     */
    set description(description) {
        this.attr('description', description);
    }

    /**
     * Define the data type of the element.
     *
     * Basic data types are primitive types to define basic data.
     *
     * @property dataType
     * @type {string|Entity}
     */
    get dataType() {
        return this.attr('dataType');
    }

    /**
     * @param dataType
     * @type {string|Entity}
     */
    set dataType(dataType) {
        if(!dataType) throw new MetadataIntegrityException('MIF005');
        if(!DataTypes[dataType] && !dataType.getInstance && !(dataType instanceof Entity)) throw new MetadataIntegrityException('MIF006');

        let realDataType = dataType;
        if(dataType.getInstance) {
            realDataType = dataType.getInstance();
        }

        this.attr('dataType', realDataType);
    }

    /**
     * Define the multiplicity for the element
     *
     * @property multiplicity
     * @type {string}
     * @default 'one'
     */
    get multiplicity() {
        return this.attr('multiplicity');
    }

    /**
     * @param multiplicity
     * @type {string}
     */
    set multiplicity(multiplicity) {
        if(['one', 'many'].indexOf(multiplicity) === -1) throw new MetadataIntegrityException('MIF007');

        this.attr('multiplicity', multiplicity);
    }

    /**
     * Define the validators for the field
     *
     * @property validators
     * @type {Validator*}
     * @default {}
     */
    get validators() {
        return this.attr('validators');
    }

    /**
     * @param validators
     * @type {Validator*}
     */
    set validators(validators) {
        this.attr('validators', {});
        
        // Add validators
        for(let validatorName in validators) {
            const validator = validators[validatorName];
            let realValidator = validator;

            if(!(validator instanceof Validator)) {
                realValidator = new Validator(validator.type, validator.validator, validator.target);
            }

            this.addValidator(validatorName, realValidator);
        }
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

        this.attr('validators')[name] = validator;

        return this;
    }
}