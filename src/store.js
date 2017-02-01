/**
 * Created by sm on 14/05/16.
 */

import { createStore } from 'redux';
import { CombinedReducer } from './reducers';

import { StoreException } from './exceptions';

import { Map } from 'immutable';

/**
 * Metadatio store.
 *
 * @module Core
 * @class Store
 */
export class Store {

    constructor(store) {

        /**
         * Determines whether the store has been configured. Upon configuration, the store is created and engaged with the defined reducers. But until this phase passes the store would not be set, and thus it's usage will result in errors. This flag is useful to avoid unexpected errors when using the store.
         *
         * @property configured
         * @type {boolean}
         */
        this.configured = false;

        this.store = null;

        /**
         * Contains all the element-specific reducers (relative to each element of your app) that are injected to the store asynchronously once you declare your elements - i.e. entities, fields and validators.
         *
         * @property asyncReducers
         * @type {Object}
         */
        this.asyncReducers = {};

        this.hooks = null;
        this.matches = null;
        this.subscriptions = null;
    }

    /**
     * Configures the store. It receives the initial state for the store, and it engages the reducers
     *
     * @method configure
     * @param initialState {Object} The initial state for the store
     * @chainable
     */
    configure(hooks, matches, subscriptions) {
        if(this.configured) throw new StoreException('STC001');
        // TODO Test parameters

        this.store = createStore(CombinedReducer());
        this.configured = true;

        this.hooks = hooks;
        this.matches = matches;
        this.subscriptions = subscriptions;

        return this;
    }

    /**
     * Injects a new reducer within the store. This is called whenever you add a new element to the metadata object, as every element within Metadatio has its own, specific reducer for performing and monitoring their actions. By adding such reducer via this method is directly engaged through the store, and the reducers are recombined.
     *
     * @method injectAsync
     * @param name {string} The name of the reducer to inject
     * @param reducer {function} The reducer to inject
     * @returns {Store}
     */
    injectAsync(name, reducer) {
        if(!this.configured) throw new StoreException('ST002');
        if(!name) throw new StoreException('STI001');
        if(typeof(name) !== 'string') throw new StoreException('STI002');
        if(!reducer) throw new StoreException('STI003');
        if(typeof(reducer) !== 'function') throw new StoreException('STI004');
        if(this.asyncReducers[name] !== undefined) throw new StoreException('STI005');

        this.asyncReducers[name] = reducer;

        this.refresh();
        return this;
    }

    /**
     * Dispatches an action through the store. This is just a gateway to call the Redux action dispatcher.
     *
     * @method dispatch
     * @param action {Object} The object that describes what happened
     * @chainable
     */
    dispatch(action) {
        if(!this.configured) throw new StoreException('ST001');
        if(typeof(action) !== 'object') throw new StoreException('STD001');
        if(!action.type) throw new StoreException('STD002');
        if(typeof(action.type) !== 'string') throw new StoreException('STD003');

        this.store.dispatch(action);
        this.dispatchHooks(action);

        return this;
    }

    dispatchHooks(action) {
        // TODO Verify parameter

        if(!this.hooks) return;
        let matches = true;

        for(let matchId in this.hooks) {
            const match = this.matches[matchId];

            for(let param in match) {
                if (action[param] !== match[param]) {
                    matches = false;
                    break;
                }
            }

            if(matches) {
                const hooks = this.hooks[matchId];

                for(let i = 0; i < hooks.length; i++) {
                    const hook = hooks[i];
                    hook(action);
                }
            }

            matches = true;
        }
    }

    refresh() {
        this.store.replaceReducer(CombinedReducer(this.asyncReducers));
    }

    /**
     * Returns the current state
     *
     * @method getState
     * @returns {Object}
     */
    getState() {
        if(!this.configured) throw new StoreException('ST003');

        return this.store.getState();
    }

    static getInstance() {
        if(!Store.instance) Store.instance = new Store();
        return Store.instance;
    }
}

export default Store.getInstance();