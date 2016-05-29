/**
 * Created by sm on 28/05/16.
 */

import { Entity, Field, DataTypes, Validator, ValidatorTypes } from '../../src/metadata';

class Todo extends Entity {

    constructor() {
        super({
            name: 'todo',
            label: 'Todo',
            fields: [
                new Field({
                    name: 'name',
                    label: 'Task name',
                    dataType: DataTypes.string,
                    validators: {
                        pattern: new Validator(ValidatorTypes.regex, /[a-zA-Z\d\-_]*/),
                        minLength: new Validator(ValidatorTypes.length, { min: 3 }),
                        maxLength: new Validator(ValidatorTypes.length, { max: 64 })
                    }
                }),
                new Field({
                    name: 'completed',
                    label: 'Task completed',
                    dataType: DataTypes.boolean,
                }),
                new Field({
                    name: 'dueDate',
                    label: 'Due date',
                    dataType: DataTypes.date
                })
            ]
        })
    }
}

export default new Todo();