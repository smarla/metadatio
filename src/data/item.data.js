/**
 * Created by sm on 24/05/16.
 */

import Metadatio from '../';
import { Element, Entity } from '../metadata';
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

            this.attr(fieldName + '-proxy', this.configureField(field))
        }

        const that = this;
        this.data = new Proxy(values, {
            get: (target, prop) => {
                if(that.attr(prop) === undefined) throw new ItemException('I005');

                const value = that.attr(prop);
                return value;
            },

            set: (target, prop, value) => {
                if(that.attr(prop) === undefined) throw new ItemException('I006');
                const newValue = that.attr(prop, value);

                Metadatio.entityActions.change(that, values[prop].field, value);
                Metadatio.fieldActions.update(that, values[prop].field, value);

                values[prop].field.validate(value);
                that.attr('valid', that.__entity.validate(that));

                return newValue;
            }
        });

        this.fields = new Proxy(values, {
            get: (target, prop) => {
                if(that.attr(prop) === undefined) throw new ItemException('II001');

                return that.attr(prop + '-proxy');
            },

            set: (target, prop, value) => {
                throw new ItemException('II002');
            }
        });

        if(data) {
            for(let param in data) {
                const value = data[param];
                this.data[param] = value;
            }
        }

        Metadatio.coreActions.scaffold(this, entity);
    }

    get valid() {
        return this.attr('valid');
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

    serialize() {
        const ret = {
            uuid: this.uuid,
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