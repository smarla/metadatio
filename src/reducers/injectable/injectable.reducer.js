/**
 * Created by sm on 14/05/16.
 */

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
}