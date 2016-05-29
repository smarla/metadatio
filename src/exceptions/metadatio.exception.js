/**
 * Created by sm on 28/05/16.
 */

export default class MetadatioException extends Error {
    constructor(code) {
        super(code);
        this.className = 'MetadatioException';
        this.code = code;
    }
}