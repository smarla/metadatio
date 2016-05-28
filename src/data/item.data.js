/**
 * Created by sm on 24/05/16.
 */

import { Element, Entity } from '../metadata';
import { ItemException } from '../exceptions';


export default class Item extends Element {

    constructor(entity, data = undefined) {
        if(!entity) throw new ItemException('I001');
        if(!(entity instanceof Entity)) throw new ItemException('I002');

        super();

        this.attr('__entity', entity);
        this.attr('className', entity.name);

        const values = {};
        for(let i = 0; i < entity.fields.length; i++) {
            const field = entity.fields[i];
            const fieldName = field.name;

            const value = null;

            values[fieldName] = {
                field,
                value: this.attr(fieldName, value)
            };

        }

        const that = this;
        this.data = new Proxy(values, {
            get: (target, prop) => {
                if(that.attr(prop) === undefined) throw new ItemException('I005');
                return that.attr(prop);
            },

            set: (target, prop, value) => {
                if(that.attr(prop) === undefined) throw new ItemException('I006');

                values[prop].field.validate(value);
                return that.attr(prop, value);
            }
        });
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
}