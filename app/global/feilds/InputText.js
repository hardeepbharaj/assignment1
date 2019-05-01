/*
 * Text field
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


const InputText = (props) => {
  const {
    input: { name },
    input,
    placeholder,
    className,
    datarelation,
    disabled,
    autocomplete,
    meta: {
      touched, error, warning, asyncValidating,
    },
    meta,
  } = props;
  return (
    <div className="form-group custom-form-group">
      <input
        {...input}
        className={touched && error ? `${className} border-red` : className}
        type="text"
        name={name}
        placeholder={placeholder}
        data-relation={datarelation}
        validate={props}
        disabled={disabled}
        autoComplete={autocomplete === 'off' ? 'off' : 'on'}
      />
      {asyncValidating &&
        <span className="warning" >* Validating your input...</span>
      }
      {touched && ((error && error !== 'Required' && <span className="form-display-error">{error}</span>) || (warning && <span className="warning-msg msg">{warning}</span>))}
    </div>
  );
};

InputText.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  TextValue: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default InputText;
