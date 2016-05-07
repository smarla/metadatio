/**
 * Created by sm on 06/05/16.
 */

import Field from './field';

import { MetadataIntegrityException } from '../exceptions';
import * as util from './util';

/**
 * Entities represent real-world elements, that you need to manage within your app.
 * Example entities are _Person_, _Car_, and whatever else you can imagine.
 *
 * Entities by itself don't contain any particular feature - apart from identification, and grouping -. Whilst some Metadatio modules will extend this objects to enrich its features, at it's core an Entity is basically a container for fields.
 *
 * ## Usage
 *
 * ```
 * const entity = new Entity({
 *   name: 'Friend',
 *   [label: 'Friend',]
 *   [namespace: 'people',]
 *   [description: 'description...',]
 *   [fields: [...]]
 * });
 * ```
 *
 * ## Entity hierarchy
 *
 * You can easily define hierarchy between your entities, by leveraging the {{#crossLink "Entity/parent:property"}}parent{{/crossLink}} property.
 *
 * ```
 * const parent = new Entity({ name: 'parent-entity', ... });
 * const child = new Entity({ name: 'child-entity', parent: parent });
 * ```
 *
 * ## Namespaces
 *
 * Entities are grouped together via `namespaces`, that shall contain entities dedicated to the same purpose, or that are related among each others.
 *
 * The `namespace` is a String set directly to the entity upon creation. If you don't set a namespace, the value `'default'` is used. So if you're only planning to use one namespace you can skip this.
 *
 *
 * ## Fields
 *
 * Fields are instances of {{#crossLink "Field"}}Field{{/crossLink}}, that you can attach upon entity creation, or at any time, by using the built-in {{#crossLink "Entity/addField:method"}}addField{{/crossLink}} method.
 *
 * ## Validation
 *
 * Entities are provided with a native validation system, to determine whether the values set within an object that should comply with entity specification are valid. Basically, entity validation targets the value for each {{#crossLink "Field"}}field{{/crossLink}} within the entity, and launches the {{#crossLink "Field/validate:method"}}field's validation system{{/crossLink}}.
 *
 *
 * @module metadata
 * @class Entity
 * @constructor
 *
 */
export default class Entity {

    /**
     * Constructor for the class
     *
     * @method constructor
     * @param props {Entity} Properties for setting up the entity
     * @example
     *      const entity = new Entity({ name: 'my-entity', ... }) // Create your entity
     *      .addField(...) // Add your fields
     */
    constructor(props) {

        /**
         * Stores the name of the entity. This name must be unique across the same {{#crossLink "Entity/namespace:property"}}namespace{{/crossLink}}. It is the only required value upon construction.
         *
         * Entity name **must** be a String, with length from 2 to 64 characters. It can only contain `a-z, A-Z` characters, digits, hyphens and underscores. All names **must** start with an `a-z, A-Z` or underscore character.
         *
         * @example
         *     new Entity({ name: 'foo-bar_123', ... }) // OK
         * @example
         *     new Entity({ name: '_foo-bar_123', ... }) // OK
         * @example
         *     new Entity({ name: '123-foo-bar', ... }) // KO
         * @example
         *     new Entity({ name: '-foo-bar_123', ... }) // KO
         * @example
         *     new Entity({ name: 'foo-bar_123$', ... }) // KO
         *
         * @property name
         * @type {String}
         */
        this.name = props.name;

        /**
         * Description for the field
         *
         * @property description
         * @type {null|string}
         */
        this.description = props.description;

        /**
         * @property namespace
         * @type {string}
         * @default 'default'
         */
        this.namespace = props.namespace || 'default';

        /**
         * Optionnally, you can define a label for the entity. The label would represent a human-readable name for the entity. It's actually useful if you wish to provided translated names for the entity - as you can set a placeholder as label - but otherwise might be not that useful, and with the {{#crossLink "Entity/name:property"}}name{{/crossLink}} it may suffice.
         *
         * @example
         *     new Entity({ label: 'Foo', ... }) // Plain label
         * @example
         *     new Entity({ label: 'entities.foo.label', ... }) // Translatable label
         *
         * @property label
         * @type {String}
         * @default null
         */
        this.label = props.label || null;

        /**
         * Parent entity. If an entity is an extension of some one more basic, you can link here the parent entity.
         *
         *
         * If your entity extends from another, **it will inherit parent's validation rules** too. The fields you extended on the child class will be validated with your defined validators, but those defined at parent's level will be validated with theirs. If you wish to override a field's validation for a parent within a child, simply include such field in the child's {{#crossLink "Entity/fields:property"}}fields{{/crossLink}} array.
         *
         * @property parent
         * @type {String|Entity}
         * @default null
         * @example
         *     const parent = new Entity({ name: 'parent-entity', ... });
         * @example
         *     const child = new Entity({ name: 'child-entity', parent: parent });
         */
        this.parent = props.parent || null;

        /**
         * Entity fields
         * @property fields
         * @type {[Field]}
         * @example
         *     [new Field({ name: 'foo', ...})] // OK
         * @example
         *     [{ name: 'foo' }] // KO
         */
        this.fields = [];

        if(!this.name) throw new MetadataIntegrityException('Entity name is required');
        if(typeof(this.name) !== 'string') throw new MetadataIntegrityException('Entity name must be a string');
        if(!util.NAME_PATTERN_VALIDATOR.validate(this.name)) throw new MetadataIntegrityException('Entity name must comply with the specification');
        if(!util.NAME_LENGTHS_VALIDATOR.validate(this.name)) throw new MetadataIntegrityException('Entity name must have between 2 a 64 characters');

        if(props.fields) {
            for(let i = 0; i < props.fields.length; i++) {
                const field = props.fields[i];
                this.addField(field);
            }
        }
    }

    /**
     * Adds a field to the entity
     *
     * @method addField
     * @param field {Field} The field to append
     * @param [overwrite=false] {Boolean} Whether to overwrite the field with same name (if it exists)
     * @returns {Entity}
     * @chainable
     */
    addField(field, overwrite=false) {
        if (!(field instanceof Field)) throw new MetadataIntegrityException('Entity fields must be instances of field');
        if(!overwrite && this.fields.filter(item => item.name === field.name).length) throw new MetadataIntegrityException('A field already exist with name ' + field.name + ', and \'overwrite\' flag has not been set');

        this.fields.push(field);

        return this;
    }
}