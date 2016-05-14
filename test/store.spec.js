/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import { expect } from 'chai';
import { Store as StoreClass } from '../src/store';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe.only('Metadatio store', () => {
    let Store = null;

    beforeEach(() => {
        Store = new StoreClass();
    });

    describe('upon creation', () => {
        it('should expose basic parameters', () => {
            expect(Store.configured).to.equal(false);
            expect(Store.store).to.equal(null);
            expect(Store.asyncReducers).to.deep.equal({});
        });

        it('should not allow to dispatch actions', (done) => {
            try {
                Store.dispatch({});
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('StoreException');
                expect(e.code).to.equal('ST001');
                done();
            }
        });

        it('should not allow reducer injection', (done) => {
            try {
                Store.injectAsync('name', {});
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('StoreException');
                expect(e.code).to.equal('ST002');
                done();
            }
        });

        it('should not allow to fetch state', (done) => {
            try {
                Store.getState();
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('StoreException');
                expect(e.code).to.equal('ST003');
                done();
            }
        });
    });

    describe('upon configuration', () => {
        it('should change its state to \'configured\'', () => {
            Store.configure(Map({}));
            expect(Store.configured).to.equal(true);
        });

        it('should not allow a second configuration attempt', (done) => {
            try {
                Store.configure(Map({}));
                Store.configure(Map({}));
                done(EXPECTING_ERROR)
            } catch(e) {
                expect(e.className).to.equal('StoreException');
                expect(e.code).to.equal('STC001');
                done();
            }
        });

        describe('the initial state', () => {
            it('should not be a non-Map instance', (done) => {
                try {
                    Store.configure({});
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('StoreException');
                    expect(e.code).to.equal('STS001');
                    done();
                }
            });

            it('should be fetchable', () => {
                const map = Map({});
                Store.configure(map);
                expect(Store.getState()).to.equal(map);
            });
        });

        describe('the \'actual\' store', () => {
            beforeEach(() => {
                Store.configure(Map({}));
            });

            it('should be initialized', () => {
                expect(Store.store).to.not.equal(null);
            });

            it('should expose basic methods', () => {
                expect(typeof Store.store.dispatch).to.equal('function');
                expect(typeof Store.store.getState).to.equal('function');
            });
        });

        describe('the store wrapper', () => {
            beforeEach(() => {
                Store.configure(Map({}));
            });

            it('should dispatch store actions', () => {
                let actionSent = null
                Store.store.dispatch = (action) => {
                    actionSent = action;
                };

                const action = {
                    value: 'action'
                };

                Store.dispatch(action);
                expect(actionSent).to.deep.equal(action);
            });

            it('should fetch store\'s state', () => {
                Store.store.getState = (action) => {
                    return 'real-state';
                };

                const state = Store.getState();
                expect(state).to.equal('real-state');
            });
        });

        describe('the action dispatcher', () => {
            beforeEach(() => {
                Store.configure(Map({}));
            });

            it('should only accept objects', (done) => {
                try {
                    Store.dispatch('wrong');
                    done(EXPECTING_ERROR);
                } catch(e) {
                    expect(e.className).to.equal('StoreException');
                    expect(e.code).to.equal('STA001');
                    done();
                }
            });

            it('should be chainable', () => {
                const ret = Store.dispatch({});
                expect(ret).to.equal(Store);
            })
        });
    });

});