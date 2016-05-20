/**
 * Created by sm on 14/05/16.
 */

export class MetadatioActions {
    static REDUX_INIT       = '@@redux/INIT';

    static DATA_SET         = 'metadatio_data_set';
    static DATA_DELETE      = 'metadatio_data_delete';

    static CONFIG_SET       = 'metadatio_config_set';
    static CONFIG_DELETE    = 'metadatio_config_delete';

    constructor() {

    }

    validate(uuid, value) {

    }

    static getInstance() {
        if(!MetadatioActions.instance) MetadatioActions.instance = new MetadatioActions();
        return MetadatioActions.instance;
    }
}

export default MetadatioActions.getInstance();