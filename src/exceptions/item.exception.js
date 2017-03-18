/**
 * Created by sm on 24/05/16.
 */

import BaseException from './base.exception';

export default class ItemException extends BaseException {
    constructor(code) {
        super(code, ItemException.codes[code], { className: 'ItemException' });
    }

    static codes = {
        'I001': 'Every item needs an entity to be configured',
        'I002': 'The Item needs an instance of Entity',
        'I003': 'You cannot override an Item\'s className',
        'I004': 'You cannot override an Item\'s entity',
        'I005': 'The item {{item}} does not contain a field {{field}}',
        'I006': 'Cannot edit the non existing field {{field}}',
        'I007': 'The data object sent to an Item must be an object',
        'I008': 'You cannot override an Item\'s namespace',

        'II001': 'Cannot fetch information about a non existing field',
        'II002': 'You cannot modify read-only field information.',
        'II003': 'You cannot change the item information like that!',
        'II004': 'Cannot read an undefined parameter of field info'
    }
}