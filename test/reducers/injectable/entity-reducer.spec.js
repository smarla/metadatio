/**
 * Created by sm on 16/05/16.
 */

import { expect } from 'chai';

import { EntityReducer } from '../../../src/reducers/injectable';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The entity reducer', () => {
    describe('upon construction', () => {
        it('should receive a parameter', (done) => {
            try {
                new EntityReducer();
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RIE001');
                done();
            }
        });

        it('should receive an instance of entity', (done) => {
            try {
                new EntityReducer('wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RIE002');
                done();
            }
        });
    });
});