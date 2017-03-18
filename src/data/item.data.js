/**
 * Created by sm on 24/05/16.
 */

import { Element, Entity, Field } from '../metadata';
import { ItemException } from '../exceptions';

export default class Item extends Element {

    configureField(field) {
        return new Proxy(field, {
            get: (target, prop) => {
                switch(prop) {
                    case 'valid':
                        return field.validate(this.attr(field.name));
                    case 'validators':
                        const ret = {};
                        for(let validatorName in field.validators) {
                            const validator = field.validators[validatorName];
                            ret[validatorName] = validator.validate(this.attr(field.name));
                        }

                        return ret;
                }

                throw new ItemException('II004');
            },

            set: (target, prop, value) => {
                throw new ItemException('II003');
            }
        });
    }

    constructor(entity, data = undefined) {

        if(!entity) throw new ItemException('I001');
        if(!(entity instanceof Entity)) throw new ItemException('I002');
        if(data !== undefined && typeof(data) !== 'object') throw new ItemException('I007');

        super();

        this.attr('valid', null);
        this.attr('__entity', entity);
        this.attr('className', entity.name);
        this.attr('namespace', entity.namespace);

        const values = {};
        this.fields = {};
        for(let i = 0; i < entity.fields.length; i++) {
            const field = entity.fields[i];
            const fieldName = field.name;

            const value = null;

            values[fieldName] = {
                field,
                value: this.attr(fieldName, value)
            };

            this.attr(fieldName + '-proxy', this.configureField(field));
        }

        const that = this;
        this.data = new Proxy(values, {
            get: (target, prop) => {
                if(typeof(prop) === 'symbol') {
                    return null;
                }

                if(['inspect', 'valueOf'].indexOf(prop) === -1 && that.attr(prop) === undefined) throw new ItemException('I005');

                let value = that.attr(prop);
                if(value instanceof Item) value = value.data;
                if(value instanceof Array) {
                    let parsedValue = [];
                    for(let valueIndex = 0; valueIndex < value.length; valueIndex++) {
                        let valueItem = value[valueIndex];
                        if(valueItem instanceof Item) valueItem = valueItem.data;
                        parsedValue.push(valueItem);
                    }
                    value = parsedValue;
                }

                return value;
            },

            set: (target, prop, value) => {
                if(that.attr(prop) === undefined) throw new ItemException('I006');
                const newValue = that.attr(prop, value);

                values[prop].field.validate(value);

                return true;
            }
        });

        this.fields = new Proxy(values, {
            get: (target, prop) => {
                if(typeof(prop) === 'symbol') {
                    return null;
                }

                if(['inspect', 'valueOf'].indexOf(prop) === -1 && that.attr(prop) === undefined) throw new ItemException('II001');

                return that.attr(prop + '-proxy');
            },

            set: (target, prop, value) => {
                throw new ItemException('II002');
            }
        });

        if(data) {
            for(let param in data) {
                const value = data[param];

                const paramName = param;

                const field = values[paramName].field;
                const fieldType = field.dataType;
                const fieldMultiplicity = field.multiplicity;

                if(fieldType instanceof Entity) {
                    if('many' === fieldMultiplicity) {
                        if(value && !(value instanceof Array)) {
                            // TODO Something here
                        }

                        const parsedData = [];
                        for(let multiItemIndex = 0; multiItemIndex < value.length; multiItemIndex++) {
                            parsedData.push(new Item(fieldType, value[multiItemIndex]));
                        }
                        this.data[param] = parsedData;
                    }
                    else {
                        this.data[param] = new Item(fieldType, value);
                    }
                }
                else {
                    this.data[param] = value;
                }
            }
        }
    }

    get valid() {
        return this.__entity.validate(this);
    }

    get __entity() {
        return this.attr('__entity');
    }

    set __entity(__entity) {
        throw new ItemException('I004');
    }

    get className() {
        return this.attr('className');
    }

    set className(attr) {
        throw new ItemException('I003');
    }

    get namespace() {
        return this.attr('namespace');
    }

    set namespace(attr) {
        throw new ItemException('I008');
    }

    serialize() {
        const ret = {
            uuid: this.uuid,
            className: this.namespace !== 'default' ? [this.namespace, this.className].join('::') : this.className,
            data: {

            }
        };

        for(let i = 0; i < this.__entity.fields.length; i++) {
            const field = this.__entity.fields[i];
            const fieldName = field.name;

            ret.data[fieldName] = this.data[fieldName];
        }

        return ret;
    }
}