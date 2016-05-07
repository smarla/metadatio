/**
 * Created by sm on 01/05/16.
 */

/**
 * Exception thrown when your metadata elements are corrupt in any way.
 *
 * @module exceptions
 * @class MetadataIntegrityException
 */
export default class MetadataIntegrityException extends Error {
    constructor(message) {
        super(message);
        this.className = 'MetadataIntegrityException';
    }
}