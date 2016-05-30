/**
 * Created by sm on 29/05/16.
 */

export default class BaseException extends Error {
    constructor(code, message, attrs) {
        super(BaseException.buildExceptionMessage(code, message, attrs));

        this.code = code;
        this.className = attrs.className;
    }

    static buildExceptionMessage(code, message, attrs) {
        return attrs.className + ' [' + code + '] ' + message;
    }
}