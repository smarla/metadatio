/**
 * Created by sm on 21/05/16.
 */

import { expect } from 'chai';

import Metadatio from '../../src';
import { Item } from '../../src/data';
import { Entity, Field, DataTypes, Validator, ValidatorTypes } from '../../src/metadata';
import ValidatorActions from '../../src/actions/validator.actions';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The validator actions', () => {
    let store = null;
    let validator = null;
    let actions = null;
    let entity = null;
    let field = null;
    let item = null;

    beforeEach(() => {
        Metadatio.mock();

        store = Metadatio.store;
        validator = new Validator(ValidatorTypes.regex, /^123$/);
        actions = new ValidatorActions(store);

        entity = new Entity({ name: 'entity' });
        item = new Item(entity);
        field = new Field({
            name: 'field',
            dataType: DataTypes.string
        });
    });

    it('should verify that an item is sent', (done) => {
        try {
            actions.validate();
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ActionException');
            expect(e.code).to.equal('AV001');
            done();
        }
    });

    it('should verify that the item is an instance of Item', (done) => {
        try {
            actions.validate('wrong');
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ActionException');
            expect(e.code).to.equal('AV002');
            done();
        }
    });

    it('should verify that the item is an instance of Item', (done) => {
        try {
            actions.validate('wrong');
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ActionException');
            expect(e.code).to.equal('AV002');
            done();
        }
    });

    it('should verify that a field is sent', (done) => {
        try {
            actions.validate(item);
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ActionException');
            expect(e.code).to.equal('AV003');
            done();
        }
    });

    it('should verify that the field is an instance of Field', (done) => {
        try {
            actions.validate(item, 'wrong');
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ActionException');
            expect(e.code).to.equal('AV004');
            done();
        }
    });

    it('should verify that a validator is sent', (done) => {
        try {
            actions.validate(item, field);
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ActionException');
            expect(e.code).to.equal('AV005');
            done();
        }
    });

    it('should verify that a validator is sent', (done) => {
        try {
            actions.validate(item, field, 'wrong');
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ActionException');
            expect(e.code).to.equal('AV006');
            done();
        }
    });

    it('should verify that a validation result is given', (done) => {
        try {
            actions.validate(item, field, validator);
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ActionException');
            expect(e.code).to.equal('AV007');
            done();
        }
    });

    it('should verify that the validation result is boolean', (done) => {
        try {
            actions.validate(item, field, validator, 'wrong');
            done(EXPECTING_ERROR);
        } catch(e) {
            expect(e.className).to.equal('ActionException');
            expect(e.code).to.equal('AV008');
            done();
        }
    });

    it('should dispatch VALIDATION_OK action if validation is true', () => {
        actions.validate(item, field, validator, true);
        expect(store.getActions()[1]).to.deep.equal({
            type: ValidatorActions.VALIDATION_OK,
            uuid: item.uuid,
            field: field.uuid,
            validator: validator.uuid
        })
    });

    it('should dispatch VALIDATION_KO action if validation is false', () => {
        actions.validate(item, field, validator, false);
        expect(store.getActions()[1]).to.deep.equal({
            type: ValidatorActions.VALIDATION_KO,
            uuid: item.uuid,
            field: field.uuid,
            validator: validator.uuid
        });
    });

});