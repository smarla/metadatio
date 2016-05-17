/**
 * Created by sm on 14/05/16.
 */

export class EntityActions {
    static ENTITY_CHANGED = 'entity_changed';

    constructor() {

    }

    validate(uuid, value) {

    }

    static getInstance() {
        if(!EntityActions.instance) EntityActions.instance = new EntityActions();
        return EntityActions.instance;
    }
}

export default EntityActions.getInstance();