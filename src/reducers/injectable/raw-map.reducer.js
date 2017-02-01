/**
 * Created by sm on 20/05/16.
 */

import { Map } from 'immutable';

import InjectableReducer from './injectable.reducer';
import { ReducerException } from '../../exceptions';

export default class RawMapReducer extends InjectableReducer {
    constructor(props) {
        if(!props) throw new ReducerException('RRM001');
        if(typeof(props) !== 'object') throw new ReducerException('RRM002');
        if(!props.subreducers) throw new ReducerException('RRM003');
        if(typeof(props.subreducers) !== 'object') throw new ReducerException('RRM004');
        for(let item in props.subreducers) {
            if (['set', 'delete'].indexOf(item) === -1) throw new ReducerException('RRM005');
            if(typeof(props.subreducers[item]) !== 'string') throw new ReducerException('RRM006');
        }

        const uuid = props.uuid;
        const initialState = Map({ uuid, storage: [] });
        super({ uuid, initialState });

        this.subreducers = props.subreducers;
        this.initialState = initialState;
    }

    reduce(state = this.initialState, action) {
        if(action.key && typeof(action.key) !== 'string') throw new ReducerException('RRM010');
        switch(action.type) {
            case this.subreducers.set:
                if(!action.key) throw new ReducerException('RRM007');
                if(!action.value) throw new ReducerException('RRM008');
                return state.set(action.key, action.value);

            case this.subreducers.delete:
                if(!action.key) throw new ReducerException('RRM009');
                return state.delete(action.key);
        }

        return state;
    }

}