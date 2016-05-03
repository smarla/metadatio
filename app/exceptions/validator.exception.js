/**
 * Created by sm on 01/05/16.
 */

export default class ValidatorException extends Error {
    constructor(e) {
        super(e);
        this.className = 'ValidatorException';
    }
}