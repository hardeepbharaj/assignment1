/*
 * Input
 */

import React from 'react';
import Form from './Form';

/**
 * Class representing a form input
 * @extends FormField
 * @prop {any} value
 * @prop {function} validate
 * @prop {function} onUpdate
 */
export default class Input extends Form {

    constructor(props) { 
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateStateValueParam = this.updateStateValueParam.bind(this);
        this.state = {
            value: (typeof this.props.value !== 'undefined') ? this.props.value : ''
        };
    }


    componentWillReceiveProps(nextProps){ 
        if(typeof nextProps.forceUpdateValue !== 'undefined' && nextProps.forceUpdateValue !==null && nextProps.forceUpdateValue!== this.props.forceUpdateValue && nextProps.forceUpdateValue !== this.state.value){
            const value = nextProps.forceUpdateValue;
            this.setState({value: value}, () => {
                if (typeof this.props.onUpdate === 'function') {
                    this.onUpdate(value);
                }
            });
        }
    }

    updateStateValueParam(value){
        this.setState({value:value});
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({value: value}, () => {
            if (typeof this.props.onUpdate === 'function') {
                this.onUpdate(value);
            }
        });
    }

}

