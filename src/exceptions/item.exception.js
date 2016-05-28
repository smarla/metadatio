/**
 * Created by sm on 24/05/16.
 */

export default class ItemException extends Error {
    constructor(code) {
        super(code);

        this.className = 'ItemException';
        this.code = code;
    }

    static codes = {
        'I001': 'Every item needs an entity to be configured',
        'I002': 'The Item needs an instance of Entity',
        'I003': 'You cannot override an Item\'s className',
        'I004': 'You cannot override an Item\'s entity',
        'I005': 'The item {{item}} does not contain a field {{field}}',
        'I006': 'Cannot edit the non existing field {{field}}'
    }
}