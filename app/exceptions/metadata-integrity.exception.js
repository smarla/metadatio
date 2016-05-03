/**
 * Created by sm on 01/05/16.
 */


export default class MetadataIntegrityException extends Error {
    constructor(message) {
        super(message);
        this.className = 'MetadataIntegrityException';
    }
}