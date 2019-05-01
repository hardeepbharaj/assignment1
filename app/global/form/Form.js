/*
 * Base form field
 */

import React, { Component } from 'react';


/**
 * Class representing the base form field
 * @extends Component
 * @prop {function} validate
 * @prop {function} onUpdate
 */
export default class Form extends Component {

    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    /**
     * Run an initial update to sync validation
     */
    componentDidMount() { 
        if (this.props.value && typeof this.props.validate === 'function') {
            this.onUpdate(this.props.value);
        }
    }

    /**
     * Validate
     * @param {any} value
     */

    validate(value) {
        if (typeof this.props.validate === 'function') {
            return (this.props.validate(value) === true);
        } else {
            return true;
        }
    }

    /**
     * Update parent
     * @param {any} value
     */
    onUpdate(value,callback) {
        if (this.props.onUpdate) {
            this.props.onUpdate.call(null, value, this.validate(value),callback);
        }
    }

}

