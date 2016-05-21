/**
 * Created by sm on 16/05/16.
 */

import shortid from 'shortid';

const attrs = {};
export default class Element {
    constructor(props) {
        this.uuid = shortid.generate();

        if(props && typeof(props) === 'object') attrs[this.uuid] = props;
        else attrs[this.uuid] = {};
    }

    attr(key, value) {
        console.log(attrs[this.uuid]);
        if(value !== undefined) {
            attrs[this.uuid][key] = value;
        }

        return attrs[this.uuid][key];
    }
}