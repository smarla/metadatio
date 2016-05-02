/**
 * Created by sm on 30/04/16.
 */

import React from 'react';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';

import * as exceptions from '../../../app/base/exceptions';
import { DataTypes, FieldTypes, Validator, ValidatorTypes } from '../../../app/metadata';

import BaseField from '../../../app/base/components/base-field.component';

let validateMetadata = (metadata) => {
    BaseField.validateMetadata({metadata}, 'metadata');
};

describe('Base field component', () => {

    it('should create a new field with basic metadata', () => {
        const metadata = {
            name: "name",
            label: "Name of your app",
            shortLabel: null,
            hint: null,
            dataType: DataTypes.string
        };

        const entity = {
            name: 'test base component'
        };
        
        const field = renderIntoDocument(<BaseField metadata={metadata} entity={entity}></BaseField>);

        const container = findRenderedDOMComponentWithClass(field, 'metadatio-field');

        const label = findRenderedDOMComponentWithTag(field, 'label');
        expect(label.textContent).to.equal(metadata.label);

        const input = findRenderedDOMComponentWithClass(field, 'metadatio-field-input');
        expect(input.textContent).to.equal(entity.name);

    });

    it('should not allow corrupted metadata (no field name)', (done) => {
        const metadata = {
            label: "Name of your app",
            shortLabel: null,
            hint: null,
            dataType: DataTypes.string
        };

        try {
            validateMetadata(metadata);
            done(new Error('An exception was expected here'));
        } catch(e) {
            expect(e.className).to.equal('MetadataIntegrityException');
            expect(e.message).to.equal('Field name is required');
            done();
        }
    });

    it('should not allow corrupted metadata (no field dataType)', (done) => {
        const metadata = {
            name: 'name',
            label: "Name of your app",
            shortLabel: null,
            hint: null
        };

        try {
            validateMetadata(metadata);
            done(new Error('An exception was expected here'));
        } catch(e) {
            expect(e.className).to.equal('MetadataIntegrityException');
            expect(e.message).to.equal('Data type is not defined');
            done();
        }
    });

    it('should have valid data type', (done) => {
        const metadata = {
            name: 'name',
            label: "Name of your app",
            shortLabel: null,
            hint: null,
            dataType: 'wrong'
        };

        try {
            validateMetadata(metadata);
            done(new Error('An exception was expected here'));
        } catch(e) {
            expect(e.className).to.equal('MetadataIntegrityException');
            expect(e.message).to.equal('Data type is invalid');
            done();
        }
    });

    it('should not allow corrupted metadata (no multiplicity)', (done) => {
        const metadata = {
            name: 'name',
            label: "Name of your app",
            shortLabel: null,
            hint: null,
            dataType: DataTypes.string
        };

        try {
            validateMetadata(metadata);
            done(new Error('An exception was expected here'));
        } catch(e) {
            expect(e.className).to.equal('MetadataIntegrityException');
            expect(e.message).to.equal('Multiplicity is not defined');
            done();
        }
    });

    it('should not allow corrupted metadata (wrong multiplicity)', (done) => {
        const metadata = {
            name: 'name',
            label: "Name of your app",
            shortLabel: null,
            hint: null,
            dataType: DataTypes.string,
            multiplicity: 'wrong'
        };

        try {
            validateMetadata(metadata);
            done(new Error('An exception was expected here'));
        } catch(e) {
            expect(e.className).to.equal('MetadataIntegrityException');
            expect(e.message).to.equal('Multiplicity is neither \'one\' nor \'many\'');
            done();
        }
    });

    describe('that intends to be used in a form', () => {
        it('should have valid permissions', (done) => {
            const metadata = {
                name: 'name',
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string,
                multiplicity: 'one',
                forms: {
                    search: {
                        permissions: {
                            'some-permission': 'h'
                        }
                    }
                }
            };

            try {
                validateMetadata(metadata);
                done(new Error('An exception was expected here'));
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.message).to.equal('Permissions set for field are neither \'r\' nor \'rw\'');
                done();
            }
        });

        it('should have a field type', (done) => {
            const metadata = {
                name: 'name',
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string,
                multiplicity: 'one',
                forms: {
                    search: {
                    }
                }
            };

            try {
                validateMetadata(metadata);
                done(new Error('An exception was expected here'));
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.message).to.equal('Field type for form is not defined');
                done();
            }
        });

        it('should have a valid field type', (done) => {
            const metadata = {
                name: 'name',
                label: "Name of your app",
                shortLabel: null,
                hint: null,
                dataType: DataTypes.string,
                multiplicity: 'one',
                forms: {
                    search: {
                        fieldType: 'wrong'
                    }
                }
            };

            try {
                validateMetadata(metadata);
                done(new Error('An exception was expected here'));
            } catch(e) {
                expect(e.className).to.equal('MetadataIntegrityException');
                expect(e.message).to.equal('Field type for form is invalid');
                done();
            }
        });
    });
});