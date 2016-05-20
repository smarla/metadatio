/**
 * Created by sm on 20/05/16.
 */

import { expect } from 'chai';

import RawMapReducer from '../../src/reducers/raw-map.reducer';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The raw map reducer', () => {
    describe('upon construction', () => {
        it('should verify that a parameter is sent', (done) => {
            try {
                new RawMapReducer();
                done(EXPECTING_ERROR)
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RRM001');
                done();
            }
        });

        it('should verify that the parameter sent is an object', (done) => {
            try {
                new RawMapReducer('wrong');
                done(EXPECTING_ERROR)
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RRM002');
                done();
            }
        });

        it('should verify that the subreducers are sent', (done) => {
            try {
                new RawMapReducer({});
                done(EXPECTING_ERROR)
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RRM003');
                done();
            }
        });

        it('should verify that the subreducers attribute is an object', (done) => {
            try {
                new RawMapReducer({ subreducers: 'wrong' });
                done(EXPECTING_ERROR)
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RRM004');
                done();
            }
        });

        it('should verify that the only subreducers sent are \'set\' and \'delete\'', (done) => {
            try {
                new RawMapReducer({ subreducers: { wrong: '' } });
                done(EXPECTING_ERROR)
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RRM005');
                done();
            }
        });

        it('should verify that the subreducers sent are strings', (done) => {
            try {
                new RawMapReducer({ subreducers: { set: 123 } });
                done(EXPECTING_ERROR)
            } catch(e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RRM006');
                done();
            }
        });
    });
});