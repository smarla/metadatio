/**
 * Created by sm on 16/05/16.
 */

import { expect } from 'chai';
import { Map } from 'immutable';

import { EntityActions } from '../../../src/actions/entity.actions';
import {Entity, Field, DataTypes} from '../../../src/metadata';
import { InjectableReducer, EntityReducer, FieldReducer } from '../../../src/reducers/injectable';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The entity reducer', () => {
    describe('upon construction', () => {
        it('should receive a parameter', (done) => {
            try {
                new EntityReducer();
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RIE001');
                done();
            }
        });

        it('should receive an instance of entity', (done) => {
            try {
                new EntityReducer('wrong');
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ReducerException');
                expect(e.code).to.equal('RIE002');
                done();
            }
        });

        describe('for engaging field management', () => {
            it('should create one field reducer for entities with one field', () => {
                const entity = new Entity({
                    name: 'entity',
                    label: 'My Entity',
                    fields: [
                        new Field({
                            name: 'name',
                            shortLabel: null,
                            hint: null,
                            dataType: DataTypes.string
                        })
                    ]
                });

                const reducer = new EntityReducer(entity);
                expect(reducer.fields.name).to.be.an.instanceof(FieldReducer);
                expect(reducer.fields.age).to.equal(undefined);
            });

            it('should create two field reducers for entities with two fields', () => {
                const entity = new Entity({
                    name: 'entity',
                    label: 'My Entity',
                    fields: [
                        new Field({
                            name: 'name',
                            shortLabel: null,
                            hint: null,
                            dataType: DataTypes.string
                        }),
                        new Field({
                            name: 'age',
                            shortLabel: null,
                            hint: null,
                            dataType: DataTypes.number
                        })
                    ]
                });

                const reducer = new EntityReducer(entity);
                expect(reducer.fields.name).to.be.an.instanceof(FieldReducer);
                expect(reducer.fields.age).to.be.an.instanceof(FieldReducer);
            });
        });
    });

    describe('upon reduction', () => {
        let entity = null;
        let reducer = null;
        let state = null;

        beforeEach(() => {
            entity = new Entity({
                name: 'entity',
                label: 'My Entity',
                fields: [
                    new Field({
                        name: 'name',
                        shortLabel: null,
                        hint: null,
                        dataType: DataTypes.string
                    }),
                    new Field({
                        name: 'age',
                        shortLabel: null,
                        hint: null,
                        dataType: DataTypes.number
                    })
                ]
            });

            state = Map({
                uuid: entity.uuid,
                changedAt: null
            });

            reducer = new EntityReducer(entity);
        });

        describe('to combine reducer with fields\'', () => {
            it('should expose a combine function', () => {
                expect(typeof(reducer.combine)).to.equal('function');
            });

            it('should return a combined reducer', () => {
                expect(typeof(reducer.combine())).to.equal('function');
            });
        });

        it('should return the same state for a non interesting action', () => {
            const reduction = InjectableReducer.doReduce()(state, {
                uuid: entity.uuid,
                type: 'SOME_UNWANTED_ACTION'
            });
            expect(reduction).to.equal(state);
        });

        it('should return the same state for a different uuid', () => {
            const reduction = InjectableReducer.doReduce()(state, {
                uuid: '123',
                type: EntityActions.ENTITY_CHANGED
            });
            expect(reduction).to.equal(state);
        });

        it('should change state on a ENTITY_CHANGED action', () => {
            const reduction = InjectableReducer.doReduce()(state, {
                uuid: entity.uuid,
                type: EntityActions.ENTITY_CHANGED,
                changedAt: new Date()
            });
            expect(reduction).to.not.equal(state);
        })
    });
});