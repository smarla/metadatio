/**
 * Created by sm on 28/05/16.
 */

import { expect } from 'chai';
import { Map } from 'immutable';

import Metadatio from '../../src';
import { Item } from '../../src/data';

import { List, Todo } from '../model';

import { CoreActions } from '../../src/actions'

const EXPECTING_ERROR = new Error('An exception was expected here');

Metadatio.init();
describe.only('Metadatio system', () => {
    let item1 = null,
        item2 = null;

    beforeEach(() => {
    });

    it('should allow to add items to the system', () => {
        item1 = Metadatio.scaffold(List);
        expect(item1.data.name).to.not.be.undefined;
        expect(item1.data.tasks).to.not.be.undefined;

        const state = Metadatio.store.getState();
        expect(state.items.__info.get('itemCount')).to.equal(1);
        expect(state.items[item1.uuid]).to.not.be.undefined;
    });

    it('should be aligned with the state when scaffolding entities', () => {
        const state = Metadatio.store.getState();

        item2 = Metadatio.scaffold(List, { name: 'Test list' });

        const nextState = Metadatio.store.getState();
        expect(nextState).to.not.deep.equal(state);
        expect(nextState.items.__info.get('itemCount')).to.equal(2);
        expect(nextState.items[item2.uuid]).to.not.be.undefined;
        expect(nextState.items[item2.uuid].info.get('uuid')).to.equal(item2.uuid);
        expect(nextState.items[item2.uuid].fields.name.info.get('uuid')).to.equal(item2.uuid + '-' + List.fields[0].uuid);
        expect(nextState.items[item2.uuid].fields.name.info.get('value')).to.equal(item2.data.name);
    });
    
    describe('when hooking up actions', () => {
        it('should trigger the hooks when the action matches', (done) => {
            let ok = false;
            const callback = () => {
                if(!ok) {
                    ok = true;
                    done();
                }
            };

            Metadatio.on({ type: CoreActions.ITEM_CREATED }, callback);
            Metadatio.scaffold(List, { name: 'Testing hooks' });
        });

        it('should not trigger the hooks when param does not match', () => {
            const callback = () => {
                throw new Error('You shouldn\'t have had this action triggered');
            };

            Metadatio.on({ type: CoreActions.ITEM_DESTROYED }, callback);
            Metadatio.scaffold(List, { name: 'Testing matches' });
        });
    })
});