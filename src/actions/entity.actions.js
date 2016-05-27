/**
 * Created by sm on 14/05/16.
 */

import { ActionException } from '../exceptions';
import { Item } from '../data';
import { Field } from '../metadata';

export default class EntityActions {
    static ITEM_CHANGED = 'metadatio-items-item-changed';
    static ITEM_DESTROYED = 'metadatio-items-item-destroyed';

    constructor(store) {
        this.store = store;
    }
    
    change(item, field, value) {
        if(!item) throw new ActionException('AE001');
        if(!(item instanceof Item)) throw new ActionException('AE002');
        if(!field) throw new ActionException('AE003');
        if(!(field instanceof Field)) throw new ActionException('AE004');
        if(value === undefined) throw new ActionException('AE005');

        this.store.dispatch({
            type: EntityActions.ITEM_CHANGED,
            uuid: item.uuid,
            field: field.uuid,
            value
        });
    }

    destroy(item) {
        if(!item) throw new ActionException('AE006');
        if(!(item instanceof Item)) throw new ActionException('AE007');

        this.store.dispatch({
            type: EntityActions.ITEM_DESTROYED,
            uuid: item.uuid
        });
    }
}