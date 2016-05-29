/**
 * Created by sm on 28/05/16.
 */

import { Entity, Field, DataTypes, Validator, ValidatorTypes } from '../../src/metadata';

import Todo from './todo.model';

class List extends Entity {
    constructor() {
        super({
            name: 'list',
            label: 'TODO List',
            fields: [
                new Field({
                    name: 'name',
                    label: 'List name',
                    dataType: DataTypes.string,
                    validators: {
                        pattern: new Validator(ValidatorTypes.regex, /[a-zA-Z\d\-_]*/),
                        minLength: new Validator(ValidatorTypes.length, { min: 3 }),
                        maxLength: new Validator(ValidatorTypes.length, { max: 64 })
                    }
                }),
                new Field({
                    name: 'tasks',
                    label: 'TODOs',
                    dataType: Todo
                })
            ]
        });
    }
}
export default new List();