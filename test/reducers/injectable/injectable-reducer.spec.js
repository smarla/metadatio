/**
 * Created by sm on 14/05/16.
 */

import { expect } from 'chai';
import { Map } from 'immutable'

import { InjectableReducer } from '../../../src/reducers/injectable';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The injectable reducer', () => {

    describe('upon construction', () => {
        it('should verify that an props object is given', (done) => {
            try {
                new InjectableReducer();
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RBI001');
                done();
            }
        });

        it('should verify that props object is an object', (done) => {
            try {
                new InjectableReducer('wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RBI002');
                done();
            }
        });

        it('should verify that the object has a UUID', (done) => {
            try {
                new InjectableReducer({});
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RBI003');
                done();
            }
        });

        it('should verify that the object has an initial state', (done) => {
            try {
                new InjectableReducer({ uuid: '1234-abcd' });
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RBI004');
                done();
            }
        });

        it('should expose a \'reduce\' function', () => {
            const injectable = new InjectableReducer({ uuid: '1234-abcd', initialState: {} });
            expect(typeof(injectable.reduce)).to.equal('function');
        });
    });

    describe('upon reduction verification', () => {
        it('should verify that a state object is given', (done) => {
            try {
                InjectableReducer.verify(null);
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RI003');
                done();
            }
        });

        it('should verify that the state object is an immutable Map', (done) => {
            try {
                InjectableReducer.verify('wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RI004');
                done();
            }
        });

        it('should receive an action to process', (done) => {
            try {
                InjectableReducer.verify(Map({}));
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RI005');
                done();
            }
        });

        it('should receive an object as action', (done) => {
            try {
                InjectableReducer.verify(Map({}), 'wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RI006');
                done();
            }
        });

        it('should receive an action with a \'type\' defined', (done) => {
            try {
                InjectableReducer.verify(Map({}), {});
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RI007');
                done();
            }
        });

        it('should receive a string as action type', (done) => {
            try {
                InjectableReducer.verify(Map({}), { type: 123 });
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RI008');
                done();
            }
        });

        it('should receive an action with a \'uuid\' defined', (done) => {
            try {
                InjectableReducer.verify(Map({}), { type: 'SOME_ACTION' });
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RI009');
                done();
            }
        });
    });

    describe('upon reduction', () => {
        it('should return the initial state if nothing is received', () => {
            const initialState = Map({});
            const reducer = new InjectableReducer({ uuid: '1234-abcd', initialState });
            const reduction = reducer.reduce();
            expect(reduction).to.equal(initialState);
        });

        it('should return the same state it receives', () => {
            const initialState = Map({});
            const reducer = new InjectableReducer({ uuid: '1234-abcd', initialState });

            const finalState = Map({});
            const reduction = reducer.reduce(finalState);
            expect(reduction).to.equal(finalState);
        });
    });
});