/**
 * Created by sm on 16/05/16.
 */

import shortid from 'shortid';

export default class Element {
    constructor() {
        this.uuid = shortid.generate();
    }
}