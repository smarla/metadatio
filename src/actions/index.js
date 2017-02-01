/**
 * Created by sm on 17/05/16.
 */

import EntityActions from './entity.actions';
import FieldActions from './field.actions';
import ValidatorActions from './validator.actions';
import CoreActions from './metadatio.actions';

module.exports = {
    FieldActions,
    EntityActions,
    ValidatorActions,
    CoreActions,
    MetadatioActions: CoreActions
};