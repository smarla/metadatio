/**
 * Created by sm on 01/05/16.
 */

import { MetadataIntegrityException } from '../exceptions';
import DataTypes from './data-types.metadata';
import FieldTypes from './field-types.metadata';

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
         * # Basic data types
         *
         * Basic data types are primitive types to define basic data.
         *
         * @property dataType
         * @type {string|Entity}
         */
        this.dataType = props.dataType;
        this.forms = props.forms;
        this.multiplicity = props.multiplicity;
        this.validators = props.validators;

        // Verify basic metadata
        if(!this.name) throw new MetadataIntegrityException('Field name is required');
        if(!this.dataType) throw new MetadataIntegrityException('Data type is not defined');
        if(!DataTypes[this.dataType]) throw new MetadataIntegrityException('Data type is invalid');
        if(!this.multiplicity) throw new MetadataIntegrityException('Multiplicity is not defined');
        if(['one', 'many'].indexOf(this.multiplicity) === -1) throw new MetadataIntegrityException('Multiplicity is neither \'one\' nor \'many\'');

        // Verify form information
        if(this.forms) {
            for(var form in this.forms) {
                var forms = this.forms;

                // Verify permissions
                for(var permission in forms[form].permissions) {
                    if(['r', 'rw'].indexOf(forms[form].permissions[permission]) === -1) throw new MetadataIntegrityException('Permissions set for field are neither \'r\' nor \'rw\'');
                }

                // Verify field type
                if(!forms[form].fieldType) throw new MetadataIntegrityException('Field type for form is not defined');
                if(!FieldTypes[forms[form].fieldType]) throw new MetadataIntegrityException('Field type for form is invalid');
            }
        }
    }

}