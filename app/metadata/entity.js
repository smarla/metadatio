/**
 * Created by sm on 06/05/16.
 */

import { MetadataIntegrityException } from '../exceptions';

/**
 * An entity represents a real-world element, whose metadata is defined via this class. An **entity** is a compound of **fields**,
 * that along with some specific configuration contains all requirements to fully define such element.
 *
 * @module metadata
 * @class Entity
 * @constructor
 */
export default class Entity {

    /**
     * Constructor for the class
     *
     * @method constructor
     * @param props {Object} Properties for setting up the entity
     */
    constructor(props) {
        this.name = props.name;
        this.label = props.label;
        this.superClass = props.superClass;
        this.namespace = props.namespace || 'default';

        this.fields = props.fields || [];

        if(!this.name) throw new MetadataIntegrityException('Entity name is required');
        if(!this.label) throw new MetadataIntegrityException('Entity label is required');
    }
}