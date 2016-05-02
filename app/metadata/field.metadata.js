/**
 * Created by sm on 01/05/16.
 */

import {DataTypes} from './';
import FieldForm from './field-form.metadata';

const FieldMetadata = {
    name: 'i-field',
    label: 'Untitled field',
    hint: 'I show you how to interact with me',
    description: 'Give you more details about what I am',
    dataType: DataTypes.string,
    forms: {
        search: new FieldForm(),
        results: new FieldForm(),
        update: new FieldForm(),
        create: new FieldForm()
    },
    multiplicity: 'one',
    validators: {
        valid_characters: new Validator('regex', /abc/)
    }
}