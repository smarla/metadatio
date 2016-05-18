/**
 * Created by sm on 18/05/16.
 */

import { Map } from 'immutable';

import InjectableReducer from './injectable.reducer';
import { Data } from '../../metadata';
import { ReducerException } from '../../exceptions';

export default class DataReducer extends InjectableReducer {

    constructor(data) {
        if(!data) throw new ReducerException('RD001');
        if(!(data instanceof Data)) throw new ReducerException('RD002');
        
        super({
            uuid: data.uuid,
            initialState: Map(data)
        });
    }
}