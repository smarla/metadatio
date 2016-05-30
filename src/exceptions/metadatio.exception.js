/**
 * Created by sm on 28/05/16.
 */

import BaseException from './base.exception';

export default class MetadatioException extends BaseException {
    constructor(code) {
        super(code, MetadatioException.codes[code], { className: 'MetadatioException' });
    }

    static codes = {
        'MS001': 'For scaffolding an item an Entity is needed',
        'MS002': 'The entity for scaffolding needs to be an instance of Entity',
        'MS003': 'For scaffolding with a data object, you need an Object'
    }
}