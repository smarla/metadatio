/**
 * Created by sm on 20/05/16.
 */

import { expect } from 'chai';
import { Map } from 'immutable';

import { MetadatioActions } from '../../src/actions/metadatio.actions';
import MetadatioReducer from '../../src/reducers/metadatio.reducer';
import RawMapReducer from '../../src/reducers/injectable/raw-map.reducer.js';

describe('The metadatio reducer', () => {

    describe('for managing config', () => {
        it('should expose a RawMap reducer as \'configReducer\'', () => {
            expect(MetadatioReducer.configReducer).to.be.an.instanceOf(RawMapReducer);
        });

        describe('the actions engaged', () => {
            it('should be \'CONFIG_SET\' for setting a value', () => {
                expect(MetadatioReducer.configReducer.subreducers.set).to.equal(MetadatioActions.CONFIG_SET);
            });

            it('should be \'CONFIG_DELETE\' for deleting a value', () => {
                expect(MetadatioReducer.configReducer.subreducers.delete).to.equal(MetadatioActions.CONFIG_DELETE);
            });
        });
    });

    describe('for managing data', () => {
        it('should expose a RawMap reducer as \'dataReducer\'', () => {
            expect(MetadatioReducer.dataReducer).to.be.an.instanceOf(RawMapReducer);
        });

        describe('the actions engaged', () => {
            it('should be \'DATA_SET\' for setting a value', () => {
                expect(MetadatioReducer.dataReducer.subreducers.set).to.equal(MetadatioActions.DATA_SET);
            });

            it('should be \'DATA_DELETE\' for deleting a value', () => {
                expect(MetadatioReducer.dataReducer.subreducers.delete).to.equal(MetadatioActions.DATA_DELETE);
            });
        });
    });
});