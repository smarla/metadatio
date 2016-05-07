/**
 * Created by sm on 07/05/16.
 */

import {expect} from 'chai';

describe.skip('that intends to be used in a form', () => {
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
            new Field(metadata);
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
            new Field(metadata);
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
            new Field(metadata);
            done(new Error('An exception was expected here'));
        } catch(e) {
            expect(e.className).to.equal('MetadataIntegrityException');
            expect(e.message).to.equal('Field type for form is invalid');
            done();
        }
    });
});