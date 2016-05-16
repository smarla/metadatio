/**
 * Created by sm on 14/05/16.
 */

import { Map } from 'immutable';
import { ReducerException } from '../../exceptions';

export default class InjectableReducer {
    constructor(props) {
        if(!props) throw new ReducerException('RBI001');
        if(typeof(props) !== 'object') throw new ReducerException('RBI002');
        if(!props.uuid) throw new ReducerException('RBI003');
        if(!props.initialState) throw new ReducerException('RBI004');

        this.uuid = props.uuid;
        this.initialState = props.initialState;
    }
    
    reduce(state = this.initialState) {
        return state;
    }

    static verify(state, action) {
        if(!state) throw new ReducerException('RI003');
        if(!(state instanceof Map)) throw new ReducerException('RI004');
        if(!action) throw new ReducerException('RI005');
        if(typeof(action) !== 'object') throw new ReducerException('RI006');
        if(!action.type) throw new ReducerException('RI007');
        if(typeof(action.type) !== 'string') throw new ReducerException('RI008');
        if(!action.uuid) throw new ReducerException('RI009');
    }
}