
/*
 * Text field
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const InputNum = (props) => {
  const {
    input,
    input: { name, label },
    className,
    noClassName,
    placeholder,
    datarelation,
    dataKey,
    dataType,
    meta: { touched, error, warning },
  } = props;

  return (
    <div className={noClassName ? '' : 'form-group'}>
      <input
        type="number"
        name={name}
        // min="0"
        data-relation={datarelation}
        data-key={dataKey}
        data-type={dataType}
        onKeyDown={(e) => {
                      if (e.which === 38 || e.which === 40) { e.preventDefault(); }
                    }}
        className={touched && error ? `${className} border-red` : className}
        placeholder={placeholder}
        {...input}
      />
      {touched && ((error && error !== 'Required' && <span className="form-display-error">{error}</span>) || (warning && <span className="warning-msg msg">{warning}</span>))}
    </div>
  );
};


InputNum.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  TextValue: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  noClassName: PropTypes.bool,
  datarelation: PropTypes.string,
  dataKey: PropTypes.string,
  dataType: PropTypes.string,
};

InputNum.defaultProps = {
  noClassName: false,
  datarelation: '',
  dataKey: '',
  dataType: '',
};

export default InputNum;
