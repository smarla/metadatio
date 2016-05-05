/**
 * Created by sm on 01/05/16.
 */

import Field from './field.metadata'
import Validator from './validator.metadata';
import * as FieldTypes from './field-types.metadata';

import { MetadataIntegrityException } from '../exceptions';

/**
 * Defines a field that belongs to an entity
 *
 * @module forms
 * @class InputField
 * @extends Field
 * @constructor
 */
export default class InputField extends Field {

    /**
     * Creates a new form definition for a field
     *
     * @method constructor
     * @param props
     */
    constructor(props) {
        super(props);

        /**
         * Defines whether the field is required
         *
         * @property required
         * @type {boolean}
         * @default false
         */
        this.required = this.props.required || false;

        /**
         * Contains the permissions with access to this field
         *
         * @property permissions
         * @type {Object}
         * @default {}
         */
        this.permissions = this.props.permissions || {};

        /**
         * Defines the appearance of the field within the form
         *
         * @property fieldType
         * @type {string}
         */
        this.fieldType = this.props.fieldType;

        /**
         * @property validators
         * @type {Object}
         * @default {}
         */
        this.formValidators = this.props.formValidators || {};

        // Verify that all permission values are either 'r' or 'rw'
        for (let permission in this.permissions) {
            if (['r', 'rw'].indexOf(this.permissions[permission]) === -1) throw new MetadataIntegrityException('Permissions set for field are neither \'r\' nor \'rw\'');
        }

        // Verify that field type has been set and the type exists within Metadatio
        if (!this.fieldType) throw new MetadataIntegrityException('Field type for form is not defined');
        if (!FieldTypes[this.fieldType]) throw new MetadataIntegrityException('Field type for form is invalid');

        // Verify that validators are Validator instances
        // If that's the case, all validation there must have been done already
        for(let validatorName in this.formValidators) {
            const validator = this.formValidators[validatorName];

            if(!(validator instanceof Validator)) throw new MetadataIntegrityException('Validators must be instances of \'Validator\'');
        }
    }

    /**
     * Validates that the value set for the field in the form
     *
     * @method validate
     * @param value
     * @returns {boolean}
     */
    validate(value) {
        const parentValidation = super.validate(value);
        if(!parentValidation) {
            // TODO Create different validation strategies
            // BREAK, COMPLETE, THROW [...]
            return false;
        }

        // Call parent function with these validators
        const formValidation = super.validate(value, this.formValidators);

        if(!formValidation) {
            // TODO Create different validation strategies
            // BREAK, COMPLETE, THROW [...]
            return false;
        }

        return true;
    }
}