import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const RadioBoxField = (props) => {
  const {
    input,
    label,
    input: { name, value },
    className,
    dataId,
    defaultChecked,
    meta: { touched, error, warning },
  } = props;

  return (
    <div>
      <label>
        <input
          type="radio"
          id={dataId}
          name={name}
          value={value}
          className={className}
          {...input}
          defaultChecked={defaultChecked}
        />
      &nbsp; {label}</label>
      {}
    </div>
  );
};

RadioBoxField.propTypes = {
  input: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};
export default RadioBoxField;
