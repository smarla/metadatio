/**
 * Created by sm on 14/05/16.
 */

import { ActionException } from '../exceptions';
import { Item } from '../data';
import { Entity } from '../metadata';

export default class MetadatioActions {
    static REDUX_INIT       = '@@redux/INIT';
    
    static ITEM_CREATED     = 'metadatio-item-created';
    static ITEM_REMOVED     = 'metadatio-item-removed';
    
    static CONFIG_SET       = 'metadatio-config-set';
    static CONFIG_DELETED   = 'metadatio-config-deleted';
    
    static DATA_SET         = 'metadatio-data-set';
    static DATA_DELETED     = 'metadatio-data-deleted';

    constructor(store) {
        this.store = store;
    }

    scaffold(item, entity) {
        if(!item) throw new ActionException('AMI001');
        if(!(item instanceof Item)) throw new ActionException('AMI002');
        if(!entity) throw new ActionException('AMI003');
        if(!(entity instanceof Entity)) throw new ActionException('AMI004');

        this.store.dispatch({
            type: MetadatioActions.ITEM_CREATED,
            entity: entity,
            item: item
        });

        this.store.refresh();
    }

    removeItem(item) {
        if(!item) throw new ActionException('AMI005');
        if(!(item instanceof Item)) throw new ActionException('AMI006');

        this.store.dispatch({
            type: MetadatioActions.ITEM_REMOVED,
            uuid: item.uuid
        });

        this.store.refresh();
    }

    setConfig(key, value) {
        if(!key) throw new ActionException('AMC001');
        if(typeof(key) !== 'string') throw new ActionException('AMC002');
        if(value === undefined) throw new ActionException('AMC003');

        this.store.dispatch({
            type: MetadatioActions.CONFIG_SET,
            key: key,
            value: value
        });
    }

    deleteConfig(key) {
        if(!key) throw new ActionException('AMC004');
        if(typeof(key) !== 'string') throw new ActionException('AMC005');
        
        this.store.dispatch({
            type: MetadatioActions.CONFIG_DELETED,
            key: key
        });
    }

    setData(key, value) {
        if(!key) throw new ActionException('AMD001');
        if(typeof(key) !== 'string') throw new ActionException('AMD002');
        if(value === undefined) throw new ActionException('AMD003');

        this.store.dispatch({
            type: MetadatioActions.DATA_SET,
            key: key,
            value: value
        });
    }

    deleteData(key) {
        if(!key) throw new ActionException('AMD004');
        if(typeof(key) !== 'string') throw new ActionException('AMD005');

        this.store.dispatch({
            type: MetadatioActions.DATA_DELETED,
            key: key
        });
    }
}