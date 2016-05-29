/**
 * Created by sm on 01/05/16.
 */

import MainStore from './store';
import { Store } from './store';
import { MetadatioException } from './exceptions';
import { Item } from './data';
import { Entity } from './metadata';

export class Core {

    constructor(store) {
        if(!store) throw new MetadatioException('MC001');
        if(!(store instanceof Store)) throw new MetadatioException('MC002');
        this.store = store;
    }
    
    init() {
        this.store.configure();
    }

    itemCount() {
        
    }

    scaffold(entity) {
        if(!entity) throw new MetadatioException('MS001');
        if(!(entity instanceof Entity)) throw new MetadatioException('MS002');

        const item = new Item(entity);
        return item;
    }

    subscribe(path, callback) {

    }

    static getInstance() {
        if(!Core.instance) Core.instance = new Core(MainStore);
        return Core.instance;
    }
}

export default Core.getInstance();