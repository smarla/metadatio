/**
 * Created by pelayosanchez on 11/05/16.
 */

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import { ActionCodes, Metadata } from '../../app/actions';
import { Entity } from '../../app';

class MockEntity extends Entity {
    constructor() {
        super({
            name: 'mock-entity',
            label: 'Mock entity',

        });
    }
}

describe('Metadata actions', () => {
    it('should store entities', () => {
        const mockEntity = MockEntity;
    });
});