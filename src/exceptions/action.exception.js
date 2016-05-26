/**
 * Created by sm on 26/05/16.
 */


export default class ActionException extends Error {
    constructor(code) {
        super(code);
        this.className = 'ActionException';
        this.code = code;
    }

    static codes = {
        'AF001': 'You need a field in order to update a field',
        'AF002': 'You need an instance of Field for updating it',
        'AF003': 'Update action for fields cannot receive \'undefined\'',
        'AF004': 'You need a field in order to clear a field',
        'AF005': 'You need an instance of Field for clearing it'
    }
}