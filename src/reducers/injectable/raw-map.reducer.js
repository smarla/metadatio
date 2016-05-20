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
        const initialState = Map({ uuid });
        super({ uuid, initialState });

        this.subreducers = props.subreducers;
    }

}