/**
 * Created by sm on 16/05/16.
 */

import { Element } from '../../src/metadata';
import { expect } from 'chai';

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
    })
});