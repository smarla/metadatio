/**
 * Created by sm on 01/05/16.
 */

import * as FieldTypes from './field-types.metadata';

const FieldFormMetadata = {
    required: true,
    permissions: {
        'some-granulated-permission': 'r',
        'some-other-permission': 'rw'
    },
    fieldType: FieldTypes.plain
};

export default FieldFormMetadata;