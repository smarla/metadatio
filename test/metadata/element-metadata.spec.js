/**
 * Created by sm on 16/05/16.
 */

import { Element } from '../../src/metadata';
import { expect } from 'chai';

const EXPECTING_ERROR = new Error('An exception was expected here');

describe('The base element', () => {
    describe('upon creation', () => {
        it('should expose a UUID', () => {
            const element = new Element();
            expect(!element.uuid).to.equal(false);
        });

        it('should create different UUIDs for different elements', () => {
            const element1 = new Element();
            const element2 = new Element();

            expect(element1.uuid).to.not.equal(element2.uuid);
        });
    });

    describe('upon data management', () => {
        it('should store the properties set on startup', () => {
            const element = new Element({ test: 'test-value' });
            const ret = element.attr('test');

            expect(ret).to.equal('test-value');
        });

        it('should store attributes via the \'attr\' method', () => {
            const element = new Element();
            const ret = element.attr('test', 'test-value');

            expect(ret).to.equal('test-value');
        });

        it('should delete a value by setting null', () => {
            const element = new Element({ test: 'test-value' });
            const ret = element.attr('test', null);

            expect(ret).to.be.null;
        });
    });
});