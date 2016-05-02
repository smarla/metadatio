/**
 * Created by sm on 30/04/16.
 */

import React, { Component, PropTypes } from 'react';
import { MetadataIntegrityException } from '../exceptions';
import {DataTypes, FieldTypes} from '../../metadata';

export default class BaseField extends Component {

    constructor(props) {
        super(props)
        this.metadata = this.props.metadata;
        this.entity = this.props.entity;
    }

    componentDidMount() {
        this.entityToForm();
    }

    componentWillUnmount() {

    }

    entityToForm() {
        this.setState({ value: this.entity[this.metadata.name] });
    }

    formToEntity() {

    }

    render() {
        return (<div className="metadatio-field">
            <label className="metadatio-field-label">{ this.props.metadata.label }</label>
            <div className="metadatio-field-input">
                { this.props.entity[this.props.metadata.name] }
            </div>
        </div>);
    }

    static validateMetadata(props, propName, componentName) {
        const obj = props[propName];

        // Verify basic metadata
        if(!obj.name) throw new MetadataIntegrityException('Field name is required');
        if(!obj.dataType) throw new MetadataIntegrityException('Data type is not defined');
        if(!DataTypes[obj.dataType]) throw new MetadataIntegrityException('Data type is invalid');
        if(!obj.multiplicity) throw new MetadataIntegrityException('Multiplicity is not defined');
        if(['one', 'many'].indexOf(obj.multiplicity) === -1) throw new MetadataIntegrityException('Multiplicity is neither \'one\' nor \'many\'');

        // Verify form information
        if(obj.forms) {
            for(var form in obj.forms) {
                var forms = obj.forms;

                // Verify permissions
                for(var permission in forms[form].permissions) {
                    if(['r', 'rw'].indexOf(forms[form].permissions[permission]) === -1) throw new MetadataIntegrityException('Permissions set for field are neither \'r\' nor \'rw\'');
                }

                // Verify field type
                if(!forms[form].fieldType) throw new MetadataIntegrityException('Field type for form is not defined');
                if(!FieldTypes[forms[form].fieldType]) throw new MetadataIntegrityException('Field type for form is invalid');
            }
        }
    }

}

BaseField.propTypes = {
    metadata: BaseField.validateMetadata,
    entity: PropTypes.object.isRequired
};