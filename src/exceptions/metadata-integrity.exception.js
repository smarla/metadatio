/**
 * Created by sm on 01/05/16.
 */

import BaseException from './base.exception';

/**
 * When you instance Metadatio entities and fields, some data health checks are performed. If in the data you declared to configure your element is corrupt in any way, this exception will be thrown.
 *
 * @module Core
 * @submodule exceptions
 * @class MetadataIntegrityException
 */
export default class MetadataIntegrityException extends BaseException {
    constructor(code, config) {
        super(code, MetadataIntegrityException.codes[code], { className: 'MetadataIntegrityException' });
    }

    static codes = {
        /**
         * ### Entity name is required.
         *
         * This error is thrown when you try to create an entity, and the description object you used does not contain a `name` param.
         * @example
         *     new Entity({});
         *
         * @attribute MIE001
         */
        'MIE001': 'Entity name is required',

        /**
         * ### Entity name must be a String.
         *
         * Thrown when you try to set a non-string value as entity name.
         *
         * @example
         *     new Entity({ name: 123 });
         *
         * @attribute MIE002
         */
        'MIE002': 'Entity name must be a string',

        /**
         * ### Entity name must comply with the specification.
         *
         * All entity names must comply with a specification: They must start by an A-Z or an underscore, and contain only letters, numbers, hyphens and underscores.
         * @example
         *     new Entity({ name: '1abc' })
         * @example
         *     new Entity({ name: '-abc' })
         * @example
         *     new Entity({ name: 'abc$' })
         *
         * @attribute MIE003
         */
        'MIE003': 'Entity name must comply with the specification',

        /**
         * ### Entity name must have between 2 a 64 characters.
         *
         * All Metadatio entities must comply with these length requirements to be valid.
         * @example
         *     new Entity({ name: 'a' })
         * @example
         *     new Entity({ name: 'a..za..za..za..z' }) // More than 64 characters :)
         *
         * @attribute MIE004
         */
        'MIE004': 'Entity name must have between 2 a 64 characters',

        /**
         * ### Entity fields must be instances of field.
         *
         * This error occurs when you try to append a non-Field object as entity's field.
         * @example
         *     new Entity({ ... fields: [{...}] })
         * @example
         *     someEntity.addField({})
         *
         * @attribute MIE005
         */
        'MIE005': 'Entity fields must be instances of field',

        /**
         * ### A field already exist with name {{name}}, and 'overwrite' flag has not been set.
         *
         * When you append a field to an entity, an existence verification is done on the field name. The {{#crossLink Entity/addField:method}}addField{{/crossLink}} method contains an optional `overwrite` flag - that bypasses this verification process. If you don't set the flag, you will get this error.
         * @example
         *     const entity = new Entity({ ... fields: [new Field({ name: 'foo'})] })
         * @example
         *     entity.addField(new Field({ name: 'foo' }))
         *
         * @attribute MIE006
         */
        'MIE006': 'A field already exist with name {{name}}, and \'overwrite\' flag has not been set',

        /**
         * ### Field name is required.
         *
         * This error is thrown when you try to create an field, and the description object you used does not contain a `name` param.
         * @example
         *     new Field({})
         *
         * @attribute MIF001
         */
        'MIF001': 'Field name is required',

        /**
         * ### Field name must be a string.
         *
         * This error is thrown when you set a non-string value as field name
         * @example
         *     new Field({ name: 123, ... })
         *
         * @attribute MIF002
         */
        'MIF002': 'Field name must be a string',

        /**
         * ### Field name must comply with the specification.
         *
         * As entities, all field names must comply with the specification -i.e.   must start by an A-Z or an underscore, and contain only letters, numbers, hyphens and underscores.
         * @example
         *     new Field({ name: '1abc', ... })
         * @example
         *     new Field({ name: '-abc', ... })
         * @example
         *     new Field({ name: 'abc$', ... })
         *
         * @attribute MIF003
         */
        'MIF003': 'Field name must comply with the specification',

        /**
         * ### Field name must have between 2 and 64 characters.
         *
         * All field names lengths must be between defined bounds
         * @example
         *     new Field({ name: 'a', ... })
         * @example
         *     new Field({ name: 'a..za..za..za..z', ... }) // More than 64 characters :D
         *
         * @attribute MIF004
         */
        'MIF004': 'Field name must have between 2 and 64 characters',

        /**
         * ### Data type is not defined.
         *
         * This exception is thrown when you define a field without a data type. Data typing your fields is essential for proper working, and thus not assigning it will result in this error.
         * @example
         *     new Field({ name: 'foo' })
         *
         * @attribute MIF005
         */
        'MIF005': 'Data type is not defined',

        /**
         * ### Data type is invalid.
         *
         * This exception occurs when you set an invalid data type to a field. Data types can only be String, Number, Boolean, Date, and references to other entities
         * @example
         *     new Field({ name: 'foo', dataType: 'wrong' })
         *
         * @attribute MIF006
         */
        'MIF006': 'Data type is invalid',

        /**
         * ### Multiplicity is neither \'one\' nor \'many\'.
         *
         * You will get this error if you setup a multiplicity for an entity that is neither 'one' nor 'many'. The {{#crossLink Field/multiplicity:property}}multiplicity{{/crossLink}} is optional, and by default is set to 'one'.
         * @example
         *     new Field({ ... multiplicity: 'wrong' })
         *
         * @attribute MIF007
         */
        'MIF007': 'Multiplicity is neither \'one\' nor \'many\'',

        /**
         * ### Validator name must be given, and be a string.
         *
         * When you attach validators to a field, you must define a *string* name for the validator - for logging purposes. When you associate a validator to a field without a name set - or with a name that is not a string -, you will get this error.
         * @example
         *     someField.addValidator(null, new Validator(...))
         * @example
         *     someField.addValidator(123, new Validator(...))
         *
         * @attribute MIV001
         */
        'MIV001': 'Validator name must be given, and be a string',

        /**
         * ### Validators must be instances of \'Validator\'.
         *
         * Every time you include a validator to a field, the value you set as validator is checked, to verify that it is an instance of {{#crossLink Validator}}Validator{{/crossLink}}. If that's not the case, this exception is thrown.
         * @example
         *     new Field({ ... validators: { 'pattern': {} } })
         * @example
         *     someField.addValidator('pattern', {});
         *
         * @attribute MIV002
         */
        'MIV002': 'Validators must be instances of \'Validator\'',

        /**
         * ### A validator already exists with name {{name}} and 'overwrite' flag has not been set.
         *
         * When you include a validator to a field at runtime, a name verification is launched. If the validator name you set already exists, and you haven't set the `overwrite` flag, this error will occur.
         * @example
         *     const someField = new Field({ ... validators: { 'pattern': ... } } });
         * @example
         *     someField.addValidator('pattern': new Validator(...));
         *
         * @attribute MIV003
         */
        'MIV003': 'A validator already exists with name {{name}} and \'overwrite\' flag has not been set'
    };
}