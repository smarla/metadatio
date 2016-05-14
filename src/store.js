/**
 * Created by sm on 14/05/16.
 */

import { createStore } from 'redux';
import createReducer from './reducers';

import { StoreException } from './exceptions';

import { Map } from 'immutable';

/**
 * Metadatio store.
 *
 * @module Core
 * @element Store
 */
export class Store {
    constructor() {

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
    }

    /**
     * Configures the store. It receives the initial state for the store, and it engages the reducers
     *
     * @method configure
     * @param initialState {Object} The initial state for the store
     * @chainable
     */
    configure(initialState) {
        if(this.configured) {
            throw new StoreException('STC001');
        }

        if(!(initialState instanceof Map)) {
            throw new StoreException('STS001');
        }

        this.store = createStore(createReducer(), initialState);
        this.configured = true;
        return this;
    }

    /**
     * Injects a new reducer within the store. This is called whenever you add a new element to the metadata object, as every element within Metadatio has its own, specific reducer for performing and monitoring their actions. By adding such reducer via this method is directly engaged through the store, and the reducers are recombined.
     *
     * @method injectAsync
     * @param name
     * @param reducer
     * @returns {Store}
     */
    injectAsync(name, reducer) {
        if(!this.configured) {
            throw new StoreException('ST002');
        }

        this.store.replaceReducer(createReducer(this.asyncReducers));
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
        if(!this.configured) {
            throw new StoreException('ST001');
        }

        this.store.dispatch(action);
        return this;
    }

    /**
     * Returns the current state
     *
     * @method getState
     * @returns {Object}
     */
    getState() {
        if(!this.configured) {
            throw new StoreException('ST003');
        }

        return this.store.getState();
    }

    static getInstance() {
        if(!Store.instance) Store.instance = new Store();
        return Store.instance;
    }
}

export default Store.getInstance();