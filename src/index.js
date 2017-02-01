/**
 * Created by sm on 01/05/16.
 */

import shortid from 'shortid';

import { EntityActions, FieldActions, ValidatorActions, CoreActions } from './actions';
import MainStore from './store';
import { Store } from './store';
import { MetadatioException } from './exceptions';
import { Item } from './data';
import { Entity } from './metadata';
import configureStore from 'redux-mock-store';

export class Core {

    static CONFIG_ACTION_HOOKS = 'metadatio-action-hooks';
    static CONFIG_ACTION_MATCHES = 'metadatio-action-matches';
    static CONFIG_SUBSCRIPTIONS = 'metadatio-subscriptions';

    constructor(store) {
        if(!store) throw new MetadatioException('MC001');
        if(!(store instanceof Store)) throw new MetadatioException('MC002');
        this.store = store;

        this.entityActions = new EntityActions(store);
        this.fieldActions = new FieldActions(store);
        this.validatorActions = new ValidatorActions(store);
        this.coreActions = new CoreActions(store);
    }

    import(json) {
        if(!json) throw new MetadatioException('MI001');
        if(typeof(json) !== 'object') throw new MetadatioException('MI002');

        return new Entity(json);
    }
    
    init() {
        this.actionHooks = {};
        this.actionMatches = {};
        this.subscriptions = {};
        
        this.store.configure(this.actionHooks, this.actionMatches, this.subscriptions);

        this.coreActions.setConfig(Core.CONFIG_ACTION_HOOKS, this.actionHooks);
        this.coreActions.setConfig(Core.CONFIG_ACTION_MATCHES, this.actionHooks);
        this.coreActions.setConfig(Core.CONFIG_SUBSCRIPTIONS, this.subscriptions);
    }

    mock() {
        const store = configureStore();
        const mockStore = store({});

        this.store = {
            dispatch: (action) => mockStore.dispatch(action),
            getActions: () => mockStore.getActions(),
            refresh: () => void(0)
        };

        this.entityActions = new EntityActions(this.store);
        this.fieldActions = new FieldActions(this.store);
        this.validatorActions = new ValidatorActions(this.store);
        this.coreActions = new CoreActions(this.store);

        this.__mocked = true;
    }

    on(action, action_to_trigger) {
        if(!action) throw new MetadatioException('MO001');
        if(typeof(action) !== 'object') throw new MetadatioException('MO002');
        if(!action_to_trigger) throw new MetadatioException('MO003');
        if(typeof(action_to_trigger) !== 'function') throw new MetadatioException('MO004');

        // TODO Verify action match existence
        const actionId = shortid.generate();
        this.actionMatches[actionId] = action

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
        if(!Core.instance) Core.instance = new Core(MainStore);
        return Core.instance;
    }
}

export default Core.getInstance();