/**
 * Created by sm on 18/05/16.
 */

import { expect } from 'chai';

import { Data } from '../../../src/metadata';
import DataReducer from '../../../src/reducers/injectable/data.reducer';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The data reducer', () => {

    describe('upon construction', () => {
        it('should verify than an object is send', (done) => {
            try {
                new DataReducer();
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RD001');
                done();
            }
        });

        it('should verify the attribute sent is a Data object', (done) => {
            try {
                new DataReducer('wrong');
                done(EXPECTING_ERROR);
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RD002');
                done();
            }
        });
    });

    describe('upon reduction', () => {

    });
});