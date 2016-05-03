/**
 * Created by sm on 30/04/16.
 */

import React, { Component, PropTypes } from 'react';

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

}

BaseField.propTypes = {
    metadata: BaseField.validateMetadata,
    entity: PropTypes.object.isRequired
};