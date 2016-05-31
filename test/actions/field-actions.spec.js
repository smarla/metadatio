/**
 * Created by sm on 21/05/16.
 */

import {expect} from 'chai';

import Metadatio from '../../src';
import { Item } from '../../src/data';
import {Entity, Field, DataTypes, Validator, ValidatorTypes} from '../../src/metadata';
import FieldActions from '../../src/actions/field.actions';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The field actions', () => {
    let store = null;
    let actions = null;
    let item = null;
    let field = null;

    beforeEach(() => {
        Metadatio.mock();

        store = Metadatio.store;
        actions = new FieldActions(store);

        field = new Field({
            name: 'test',
            dataType: DataTypes.string
        });

        const entity = new Entity({ name: 'entity' });
        item = new Item(entity);
    });

    describe('for updating values', () => {
        it('should verify that an item is sent', (done) => {
            try {
                actions.update();
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF001');
                done();
            }
        });

        it('should verify that the item sent is an instance of Item', (done) => {
            try {
                actions.update('wrong');
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF002');
                done();
            }
        });

        it('should verify that a field is sent', (done) => {
            try {
                actions.update(item);
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF003');
                done();
            }
        });

        it('should verify that the field is an instance of field', (done) => {
            try {
                actions.update(item, 'wrong');
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF004');
                done();
            }
        });

        it('should verify that the value is not undefined', (done) => {
            try {
                actions.update(item, field);
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF005');
                done();
            }
        });

        it('should dispatch VALUE_CHANGED action when value is first set', () => {
            actions.update(item, field, '123');
            expect(store.getActions()[1]).to.deep.equal({
                type: FieldActions.VALUE_CHANGED,
                uuid: item.uuid,
                field: field.uuid,
                value: '123'
            });
        });
    });

    describe('for resetting values', () => {
        it('should verify that an item is sent', (done) => {
            try {
                actions.clear();
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF006');
                done();
            }
        });

        it('should verify that the item sent is an instance of Item', (done) => {
            try {
                actions.clear('wrong');
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF007');
                done();
            }
        });

        it('should verify that a field is sent', (done) => {
            try {
                actions.clear(item);
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF008');
                done();
            }
        });

        it('should verify that the field is an instance of field', (done) => {
            try {
                actions.clear(item, 'wrong');
                done(EXPECTING_ERROR);
            } catch (e) {
                expect(e.className).to.equal('ActionException');
                expect(e.code).to.equal('AF009');
                done();
            }
        });

        it('should dispatch VALUE_CLEARED for a field', () => {
            actions.clear(item, field);
            expect(store.getActions()[1]).to.deep.equal({
                type: FieldActions.VALUE_CLEARED,
                uuid: item.uuid,
                field: field.uuid
            });
        });
    });
});