/**
 * Created by sm on 14/05/16.
 */

import { InjectableReducer } from '../../../src/reducers/injectable';
import { expect } from 'chai';

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
                new InjectableReducer({ uuid: '1234-abcd' })
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
})