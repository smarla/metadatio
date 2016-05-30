/**
 * Created by sm on 26/05/16.
 */

import BaseException from './base.exception';

export default class ActionException extends BaseException {
    constructor(code) {
        super(code, ActionException.codes[code], { className: 'ActionException' });
    }

    static codes = {
        'AF001': 'You need an item to update its field',
        'AF002': 'The item to update the field needs to be an instance of Item',
        'AF003': 'You need a field in order to update a field',
        'AF004': 'You need an instance of Field for updating it',
        'AF005': 'Update action for fields cannot receive \'undefined\'',
        'AF006': 'You need an item to clear a field',
        'AF007': 'The item to clear the field needs to be an instance of Item',
        'AF008': 'You need a field in order to clear a field',
        'AF009': 'You need an instance of Field for clearing it',

        'AFV001': 'You need to send a validator to validate',
        'AFV002': 'The validator needs to be an instance of Validator',
        'AFV003': 'The validate action needs to receive the validation result',
        'AFV004': 'The validate action needs a boolean for validation result',

        'AE001': 'You need an item to update an item',
        'AE002': 'The item to update needs to be an instance of Item',
        'AE003': 'You need a field in order to change an item',
        'AE004': 'The field needed for changing an entity must be an instance of Field',
        'AE005': 'The value needed for changing an entity cannot be undefined',
        'AE006': 'You need an item to destroy an item',
        'AE007': 'The item to destroy needs to be an instance of Item',
    }
}