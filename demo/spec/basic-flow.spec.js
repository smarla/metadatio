/**
 * Created by sm on 28/05/16.
 */

import { expect } from 'chai';
import { Map } from 'immutable';

import Metadatio from '../../src';
import { Item } from '../../src/data';

import { List, Todo } from '../model';


Metadatio.init();
describe.only('Metadatio system', () => {
    beforeEach(() => {
    });

    it('should have an initial application state', () => {
        const state = Metadatio.store.getState();
        expect(state).to.deep.equal({
            config: Map({}),
            data: Map({}),
            items: {
                __info: Map({})
            }
        });
    });

    it('should allow to add items to the system', () => {
        const list = Metadatio.scaffold(List);
        expect(list.name).to.not.undefined();
        expect(list.todos).to.not.undefined();
    });
});