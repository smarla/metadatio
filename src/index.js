/**
 * Created by sm on 01/05/16.
 */

import shortid from 'shortid';

import { MetadatioException } from './exceptions';
import { Item } from './data';
import { Entity } from './metadata';

export class Core {

    static CONFIG_ACTION_HOOKS = 'metadatio-action-hooks';
    static CONFIG_ACTION_MATCHES = 'metadatio-action-matches';
    static CONFIG_SUBSCRIPTIONS = 'metadatio-subscriptions';

    constructor() {
        this.actionHooks = {};
        this.actionMatches = {};
        this.subscriptions = {};
    }

    import(json) {
        if(!json) throw new MetadatioException('MI001');
        if(typeof(json) !== 'object') throw new MetadatioException('MI002');

        return new Entity(json);
    }

    on(action, action_to_trigger) {
        if(!action) throw new MetadatioException('MO001');
        if(typeof(action) !== 'object') throw new MetadatioException('MO002');
        if(!action_to_trigger) throw new MetadatioException('MO003');
        if(typeof(action_to_trigger) !== 'function') throw new MetadatioException('MO004');

        // TODO Verify action match existence
        const actionId = shortid.generate();
        this.actionMatches[actionId] = action;

        if(!this.actionHooks[actionId]) {
            this.actionHooks[actionId] = [];
        }

        this.actionHooks[actionId].push(action_to_trigger);

        return actionId;
    }

    scaffold(entity, data = undefined) {
        if(!entity) throw new MetadatioException('MS001');
        if(!(entity instanceof Entity)) throw new MetadatioException('MS002');
        if(data !== undefined && typeof(data) !== 'object') throw new MetadatioException('MS003');

        const item = new Item(entity, data);

        return item;
    }

    subscribe(action, callback) {
        // TODO
    }

    static getInstance() {
        if(!Core.instance) Core.instance = new Core();
        return Core.instance;
    }
}

export default Core.getInstance();