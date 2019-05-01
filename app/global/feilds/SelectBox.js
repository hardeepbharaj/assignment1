import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const SelectBox = (props) => {
  const {
    input,
    input: { name, value },
    placeholder,
    defaultOption,
    options,
    className,
    meta: { touched, error, warning },
  } = props;

  return (
    <div className="form-group">
      <select
        className={touched && error ? `${className} border-red` : className}
        type="text"
        name={name}
        placeholder={placeholder}
        {...input}
      >
        {defaultOption && <option value="">{defaultOption}</option> }
        { 
          options && options.map((data, index) => {
            return (
              <option value={data} key={index}>{data}</option>
            )
          })
        }
      </select>
      {touched && ((error && error !== 'Required' && <span className="form-display-error">{error}</span>) || (warning && <span className="warning-msg msg">{warning}</span>))}
    </div>
  );
};

SelectBox.propTypes = {
  input: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectBox;
