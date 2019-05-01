import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const CheckBoxField = (props) => {
  const {
    input,
    label,
    input: { name, value },
    className,
    defaultChecked,
    meta: { touched, error, warning },
  } = props;

  return (
    <div>
      <label>
        <input
          type="checkbox"
          id={name}
          name={name}
          className={className}
          {...input}
          defaultChecked={defaultChecked}
        />
      &nbsp; {label}</label>
      {touched && ((error && <span className="error-msg msg">{error}</span>) || (warning && <span className="warning-msg msg">{warning}</span>))}
    </div>
  );
};

CheckBoxField.propTypes = {
  input: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};
export default CheckBoxField;
